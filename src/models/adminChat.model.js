// models/adminChat.model.js
import { pool } from "../config/db.config.js";

// 🔹 Admin inbox list
export const getAdminInbox = async () => {
    const [rows] = await pool.execute(`
      SELECT 
        c.id AS conversationId,
        c.visitor_id AS visitorId,
        c.assigned_admin_id AS assignedAdminId,
        c.status,
        c.created_at,
        lm.message AS lastMessage,
        lm.created_at AS lastMessageAt
      FROM conversations c
      LEFT JOIN (
        SELECT m1.conversation_id, m1.message, m1.created_at
        FROM messages m1
        INNER JOIN (
          SELECT conversation_id, MAX(id) AS max_id
          FROM messages
          GROUP BY conversation_id
        ) m2
        ON m1.conversation_id = m2.conversation_id
        AND m1.id = m2.max_id
      ) lm
        ON lm.conversation_id = c.id
      ORDER BY 
        COALESCE(lm.created_at, c.created_at) DESC
    `);
  
    return rows;
  };
// 🔹 Assign admin to conversation
export const assignConversationToAdmin = async (conversationId, adminId) => {
  const [result] = await pool.execute(
    `
    UPDATE conversations 
    SET assigned_admin_id = ?
    WHERE id = ? AND assigned_admin_id IS NULL
    `,
    [adminId, conversationId]
  );

  return result.affectedRows; // 1 = success, 0 = already assigned
};
