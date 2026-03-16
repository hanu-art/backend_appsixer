import { successResponse, errorResponse } from '../utils/response.util.js';
import { insertMessage, insertMessageStatus } from '../models/message.model.js';
import { getConversationById } from '../models/conversation.model.js';

export const sendMessage = async (req, res) => {
  try {
    const body = req.body || {};

    const conversationId = Number(body.conversationId);
    const senderType = body.senderType;
    const text = body.message;

    // ✅ senderId resolution (IMPORTANT FIX)
    let senderId;
    if (senderType === 'admin') {
      // 🔒 ADMIN ID ALWAYS FROM JWT
      senderId = Number(req.user?.userId);
    } else {
      // 🔒 VISITOR ID FROM BODY
      senderId = Number(body.senderId);
    }

    // 🔹 basic validations
    if (!Number.isInteger(conversationId) || conversationId <= 0) {
      return errorResponse(res, { statusCode: 400, message: 'Invalid conversationId' });
    }

    if (!['visitor', 'admin'].includes(senderType)) {
      return errorResponse(res, { statusCode: 400, message: 'Invalid senderType' });
    }

    if (!Number.isInteger(senderId) || senderId <= 0) {
      return errorResponse(res, { statusCode: 400, message: 'Invalid senderId' });
    }

    if (!text || typeof text !== 'string' || !text.trim()) {
      return errorResponse(res, { statusCode: 400, message: 'Message is required' });
    }

    const conversation = await getConversationById(conversationId);
    if (!conversation) {
      return errorResponse(res, {
        statusCode: 404,
        message: 'Conversation not found'
      });
    }

    // 🔒 ownership validation
    if (senderType === 'visitor' && conversation.visitor_id !== senderId) {
      return errorResponse(res, {
        statusCode: 403,
        message: 'You are not allowed to send message in this conversation'
      });
    }

    if (senderType === 'admin' && conversation.assigned_admin_id !== senderId) {
      return errorResponse(res, {
        statusCode: 403,
        message: 'Admin not assigned to this conversation'
      });
    }

    // ✅ insert message
    const messageId = await insertMessage({
      conversationId,
      senderType,
      senderId,
      message: text.trim()
    });

    // ✅ insert message_status ONLY if receiver exists
    if (senderType === 'visitor' && conversation.assigned_admin_id) {
      await insertMessageStatus({
        messageId,
        receiverType: 'admin',
        receiverId: conversation.assigned_admin_id
      });
    }

    if (senderType === 'admin') {
      await insertMessageStatus({
        messageId,
        receiverType: 'visitor',
        receiverId: conversation.visitor_id
      });
    }

    return successResponse(res, {
      statusCode: 201,
      message: 'Message sent',
      data: { messageId }
    });

  } catch (err) {
    return errorResponse(res, {
      statusCode: 500,
      message: 'Failed to send message',
      errors: err.message
    });
  }
};
