// models/messageRead.model.js
import { pool } from "../config/db.config.js";

/**
 * Mark messages as read for a conversation
 */
export const markMessagesAsRead = async ({
  conversationId,
  receiverType,
  receiverId
}) => {
  const [result] = await pool.execute(
    `
    UPDATE message_status ms
    JOIN messages m ON m.id = ms.message_id
    SET ms.status = 'read'
    WHERE m.conversation_id = ?
      AND ms.receiver_type = ?
      AND ms.receiver_id = ?
      AND ms.status != 'read'
    `,
    [conversationId, receiverType, receiverId]
  );

  return result.affectedRows;
};
