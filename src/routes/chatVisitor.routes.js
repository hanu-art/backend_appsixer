// routes/chatVisitor.routes.js 

import express from 'express';
import { initVisitor } from '../controllers/chatVisitor.controller.js';

const router = express.Router();

// POST /api/t/visitor 

router.post('/visitor', initVisitor);

export default router;
