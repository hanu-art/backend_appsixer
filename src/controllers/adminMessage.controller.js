// controllers/adminMessage.controller.js
import { successResponse
    , errorResponse
 } from '../utils/response.util.js'; 


import { insertAdminMessage
    , insertAdminMessageStatus ,
    getVisitorIdByConversation
 } from '../models/adminMessage.model.js';
/**
 * POST /api/chat/admin/message
 * Body: { conversationId, message }
 * Admin id comes from auth middleware
 */
export const sendAdminMessage = async (req, res) => {
  try {
    const conversationId = Number(req.body?.conversationId);
    const messageText = req.body?.message;
    const adminId = Number(req.user?.userId); // 🔥 from middleware

    // 🔒 validations
    if (!Number.isInteger(conversationId) || conversationId <= 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Invalid conversationId'
      });
    }

    if (!adminId || adminId <= 0) {
      return errorResponse(res, {
        statusCode: 401,
        message: 'Unauthorized admin'
      });
    }

    if (!messageText || typeof messageText !== 'string' || !messageText.trim()) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Message is required'
      });
    }

    // 🔍 get visitor for this conversation
    const visitorId = await getVisitorIdByConversation(conversationId);

    if (!visitorId) {
      return errorResponse(res, {
        statusCode: 404,
        message: 'Conversation not found'
      });
    }

    // 1️⃣ insert message
    const messageId = await insertAdminMessage({
      conversationId,
      adminId,
      message: messageText.trim()
    });

    // 2️⃣ insert message status (sent to visitor)
    await insertAdminMessageStatus({
      messageId,
      visitorId
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Admin message sent',
      data: { messageId }
    });

  } catch (err) {
    return errorResponse(res, {
      statusCode: 500,
      message: 'Failed to send admin message',
      errors: err.message
    });
  }
};
