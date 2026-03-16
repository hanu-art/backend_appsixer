// models/adminMessage.model.js
import { pool } from "../config/db.config.js";

// 🔹 insert admin message
export const insertAdminMessage = async ({
  conversationId,
  adminId,
  message
}) => {
  const [result] = await pool.execute(
    `
    INSERT INTO messages (conversation_id, sender_type, sender_id, message)
    VALUES (?, 'admin', ?, ?)
    `,
    [conversationId, adminId, message]
  );

  return result.insertId; // message_id
};

// 🔹 insert message status (sent to visitor)
export const insertAdminMessageStatus = async ({
  messageId,
  visitorId
}) => {
  await pool.execute(
    `
    INSERT INTO message_status (message_id, receiver_type, receiver_id, status)
    VALUES (?, 'visitor', ?, 'sent')
    `,
    [messageId, visitorId]
  );
};

// 🔹 get visitor id from conversation
export const getVisitorIdByConversation = async (conversationId) => {
  const [rows] = await pool.execute(
    `
    SELECT visitor_id 
    FROM conversations 
    WHERE id = ? 
    LIMIT 1
    `,
    [conversationId]
  );

  return rows[0]?.visitor_id || null;
};
