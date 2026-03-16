import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { fetchConversationMessages } from '../controllers/chatMessageFetch.controller.js';

const router = Router();

/**
 * Admin + Visitor both can access
 */
router.get(
  '/conversation/:conversationId/messages',
  authMiddleware,
  fetchConversationMessages
);

export default router;
