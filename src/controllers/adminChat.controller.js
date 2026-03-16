// controllers/adminChat.controller.js
import { successResponse,
    errorResponse
 } from '../utils/response.util.js';

import { getAdminInbox
    , assignConversationToAdmin
 } from '../models/adminChat.model.js';
/**
 * GET /api/chat/admin/inbox
 */  
export const fetchAdminInbox = async (req, res) => {
    try {
      const conversations = await getAdminInbox();
  
      return successResponse(res, {
        message: 'Admin inbox fetched',
        data: conversations
      });
    } catch (err) {
      return errorResponse(res, {
        statusCode: 500,
        message: 'Failed to fetch admin inbox',
        errors: err.message
      });
    }
  };
  
  export const assignChat = async (req, res) => {
    try {
      const conversationId = Number(req.body?.conversationId);
  
      // 🔥 ADMIN ID FROM AUTH MIDDLEWARE
      const adminId = Number(req.user?.userId);
  
      if (!Number.isInteger(conversationId) || conversationId <= 0) {
        return errorResponse(res, {
          statusCode: 400,
          message: 'Invalid conversationId'
        });
      }
  
      if (!Number.isInteger(adminId) || adminId <= 0) {
        return errorResponse(res, {
          statusCode: 401,
          message: 'Unauthorized admin'
        });
      }
  
      const updated = await assignConversationToAdmin(conversationId, adminId);
  
      if (updated === 0) {
        return errorResponse(res, {
          statusCode: 409,
          message: 'Conversation already assigned'
        });
      }
  
      return successResponse(res, {
        message: 'Conversation assigned successfully'
      });
  
    } catch (err) {
      return errorResponse(res, {
        statusCode: 500,
        message: 'Failed to assign conversation',
        errors: err.message
      });
    }
  };