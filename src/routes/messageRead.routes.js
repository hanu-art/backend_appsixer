// routes/messageRead.routes.js
import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { markChatAsRead } from '../controllers/messageRead.controller.js';

const router = Router();

// Admin or visitor can hit this
router.patch('/message/read', authMiddleware, markChatAsRead);

export default router
