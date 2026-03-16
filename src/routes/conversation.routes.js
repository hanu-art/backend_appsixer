// routes/conversation.routes.js
import { Router } from 'express';
import { initConversation } from '../controllers/conversation.controller.js';

const router = Router();

// POST /api/chat/conversation
router.post('/conversation', initConversation);

export default router;
