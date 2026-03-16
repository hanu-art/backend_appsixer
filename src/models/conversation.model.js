import { pool } from "../config/db.config.js";

/**
 * Get conversation by id
 * (chat message validation ke liye)
 */
export const getConversationById = async (conversationId) => {
  const [rows] = await pool.execute(
    `SELECT id, visitor_id, assigned_admin_id
     FROM conversations
     WHERE id = ?
     LIMIT 1`,
    [conversationId]
  );

  return rows[0] || null;
};

/**
 * Create new conversation
 * (existing controller ke liye – taaki error na aaye)
 */
export const createConversation = async (visitorId) => {
  const [result] = await pool.execute(
    `INSERT INTO conversations (visitor_id) VALUES (?)`,
    [visitorId]
  );

  return result.insertId;
};
