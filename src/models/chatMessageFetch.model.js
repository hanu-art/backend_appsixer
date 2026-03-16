import { pool } from "../config/db.config.js";

/**
 * Get all messages of a conversation
 */
export const getMessagesByConversation = async (conversationId) => {
  const [rows] = await pool.execute(
    `
    SELECT
      m.id,
      m.sender_type AS senderType,
      m.sender_id AS senderId,
      m.message,
      m.created_at AS createdAt,
      ms.status
    FROM messages m
    LEFT JOIN message_status ms
      ON ms.message_id = m.id
    WHERE m.conversation_id = ?
    ORDER BY m.id ASC
    `,
    [conversationId]
  );

  return rows;
};
