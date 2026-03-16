// models/chatVisitor.model.js
import { pool } from "../config/db.config.js";

export const createVisitor = async () => {
  const [result] = await pool.execute(
    'INSERT INTO chat_visitors () VALUES ()'
  );
  return result.insertId; // visitor_id
};

export const getVisitorById = async (visitorId) => {
  const [rows] = await pool.execute(
    'SELECT id FROM chat_visitors WHERE id = ? LIMIT 1',
    [visitorId]
  );
  return rows[0] || null;
};
