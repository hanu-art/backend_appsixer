
import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { sendAdminMessage } from '../controllers/adminMessage.controller.js';

const router = Router();

// POST /api/chat/admin/message
router.post('/admin/message', authMiddleware, sendAdminMessage);

export default router;