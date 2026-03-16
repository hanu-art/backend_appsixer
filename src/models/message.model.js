// models/message.model.js
import { pool } from "../config/db.config.js";

// insert message
export const insertMessage = async ({
  conversationId,
  senderType,
  senderId,
  message
}) => {
  const [result] = await pool.execute(
    `INSERT INTO messages (conversation_id, sender_type, sender_id, message)
     VALUES (?, ?, ?, ?)`,
    [conversationId, senderType, senderId, message]
  );
  return result.insertId; // message_id
};

// insert initial message status = sent
export const insertMessageStatus = async ({
  messageId,
  receiverType,
  receiverId
}) => {
  await pool.execute(
    `INSERT INTO message_status (message_id, receiver_type, receiver_id, status)
     VALUES (?, ?, ?, 'sent')`,
    [messageId, receiverType, receiverId]
  );
};
