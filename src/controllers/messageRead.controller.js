// controllers/messageRead.controller.js
import { successResponse
    , errorResponse
 } from '../utils/response.util.js';

import { markMessagesAsRead } from '../models/messageRead.model.js';

/**
 * PATCH /api/chat/message/read
 * Body: { conversationId, readerType }
 *
 * readerType = 'admin' | 'visitor'
 */  



export const markChatAsRead = async (req, res) => {
    try {
      const conversationId = Number(req.body?.conversationId);
      const readerType = req.body?.readerType;
  
      const readerId =
        readerType === 'admin'
          ? Number(req.user?.userId)
          : Number(req.body?.visitorId);
  
      // validations
      if (!Number.isInteger(conversationId) || conversationId <= 0) {
        return errorResponse(res, { statusCode: 400, message: 'Invalid conversationId' });
      }
  
      if (!['admin', 'visitor'].includes(readerType)) {
        return errorResponse(res, { statusCode: 400, message: 'Invalid readerType' });
      }
  
      if (!Number.isInteger(readerId) || readerId <= 0) {
        return errorResponse(res, { statusCode: 400, message: 'Invalid readerId' });
      }
  
      // ✅ FIX: receiver = reader
      const receiverType = readerType;
      const receiverId = readerId;
  
      const updatedCount = await markMessagesAsRead({
        conversationId,
        receiverType,
        receiverId
      });
  
      return successResponse(res, {
        message: 'Messages marked as read',
        data: { updatedCount }
      });
  
    } catch (err) {
      return errorResponse(res, {
        statusCode: 500,
        message: 'Failed to mark messages as read',
        errors: err.message
      });
    }
  };