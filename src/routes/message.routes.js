// routes/message.routes.js
import { Router } from 'express';
import { sendMessage } from '../controllers/message.controller.js';

const router = Router();

// POST /api/chat/message
router.post('/message', sendMessage);

export default router;
