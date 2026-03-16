import express from 'express';
import errorMiddleware from './middleware/error.middleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import contactRouter from './routes/contact.routes.js';
import statusRouter from './routes/status.routes.js';
import counterRouter from './routes/counter.routes.js'; 
import jobDivaRouter from './routes/jobDiva.routes.js';
import AnalyticRouter from './routes/contactAnalytics.routes.js';

import conversationRoutes from './routes/conversation.routes.js';

import chatVisitorRoutes from './routes/chatVisitor.routes.js';  

import messageRoutes from './routes/message.routes.js'; 

import adminChatRoutes from './routes/adminChat.routes.js'; 

import adminMessageRoutes  from './routes/adminMessage.routes.js';

import messageReadRoutes from './routes/messageRead.routes.js';

import chatMessageFetchRoutes from './routes/chatMessageFetch.routes.js';





const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://appsixer.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api', contactRouter);
app.use('/api', statusRouter); 
app.use("/api" , counterRouter)
app.use("/api" , jobDivaRouter)
app.use("/api" , AnalyticRouter) 

app.use('/api/chat', chatVisitorRoutes); 
app.use('/api/chat', conversationRoutes);
app.use('/api/chat', messageRoutes); 
app.use('/api/chat', adminChatRoutes);
app.use('/api/chat', adminMessageRoutes);
app.use('/api/chat', messageReadRoutes);
app.use('/api/chat', chatMessageFetchRoutes);
app.use(errorMiddleware);
export default app;