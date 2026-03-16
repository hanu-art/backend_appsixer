// controllers/conversation.controller.js
import { successResponse
    , errorResponse
 } from '../utils/response.util.js';
import {
 getConversationById,
  createConversation
} from '../models/conversation.model.js';

/**
 * POST /api/chat/conversation
 * Body: { visitorId }
 */
export const initConversation = async (req, res) => {
  try {
    const body = req.body || {};
    const visitorId = Number(body.visitorId);

    // 🔒 validation
    if (!Number.isInteger(visitorId) || visitorId <= 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Invalid visitorId'
      });
    }

    // 🔍 check existing conversation
    const existingConversation = await getConversationById(visitorId);

    if (existingConversation) {
      return successResponse(res, {
        message: 'Conversation already exists',
        data: { conversationId: existingConversation.id }
      });
    }

    // ➕ create new conversation
    const newConversationId = await createConversation(visitorId);

    return successResponse(res, {
      statusCode: 201,
      message: 'Conversation created',
      data: { conversationId: newConversationId }
    });

  } catch (err) {
    return errorResponse(res, {
      statusCode: 500,
      message: 'Failed to initialize conversation',
      errors: err.message
    });
  }
};
