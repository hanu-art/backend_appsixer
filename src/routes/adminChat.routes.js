// routes/adminChat.routes.js
import { Router } from 'express';

import { fetchAdminInbox
    , assignChat
 } from '../controllers/adminChat.controller.js';
const router = Router();

import authMiddleware from '../middleware/auth.middleware.js';
// GET admin inbox
router.get('/admin/inbox',authMiddleware , fetchAdminInbox);

// POST assign conversation
router.post('/admin/assign',authMiddleware , assignChat);

export default router;
