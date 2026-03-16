import { successResponse
    , errorResponse
 } from '../utils/response.util.js';

 import { getMessagesByConversation } from '../models/chatMessageFetch.model.js';

/**
 * GET /api/chat/conversation/:conversationId/messages
 */
export const fetchConversationMessages = async (req, res) => {
  try {
    const conversationId = Number(req.params.conversationId);

    if (!Number.isInteger(conversationId) || conversationId <= 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Invalid conversationId'
      });
    }

    const messages = await getMessagesByConversation(conversationId);

    return successResponse(res, {
      message: 'Messages fetched',
      data: messages
    });

  } catch (err) {
    return errorResponse(res, {
      statusCode: 500,
      message: 'Failed to fetch messages',
      errors: err.message
    });
  }
};
