const db = require('../config/database');

class Message {
  static async create({ sender_id, receiver_id, job_id, content }) {
    const [result] = await db.query(
      'INSERT INTO messages (sender_id, receiver_id, job_id, content) VALUES (?, ?, ?, ?)',
      [sender_id, receiver_id, job_id || null, content]
    );
    const [rows] = await db.query('SELECT * FROM messages WHERE id = ?', [result.insertId]);
    return rows[0];
  }

  static async getConversation(userA, userB) {
    const [rows] = await db.query(
      `SELECT * FROM messages
       WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
       ORDER BY created_at ASC`,
      [userA, userB, userB, userA]
    );
    return rows;
  }

  // Returns the most recent message per conversation partner for a user (inbox list)
  static async getInbox(userId) {
    const [rows] = await db.query(
      `SELECT m.*, u.name AS other_name,
        (SELECT COUNT(*) FROM messages m2
          WHERE m2.sender_id = other_id AND m2.receiver_id = ? AND m2.is_read = FALSE) AS unread_count
       FROM (
         SELECT *,
           CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END AS other_id
         FROM messages
         WHERE sender_id = ? OR receiver_id = ?
       ) m
       JOIN users u ON u.id = m.other_id
       JOIN (
         SELECT CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END AS partner_id,
                MAX(created_at) AS last_time
         FROM messages
         WHERE sender_id = ? OR receiver_id = ?
         GROUP BY partner_id
       ) latest ON latest.partner_id = m.other_id AND latest.last_time = m.created_at
       ORDER BY m.created_at DESC`,
      [userId, userId, userId, userId, userId, userId, userId]
    );
    return rows;
  }

  static async markAsRead(senderId, receiverId) {
    await db.query(
      'UPDATE messages SET is_read = TRUE WHERE sender_id = ? AND receiver_id = ?',
      [senderId, receiverId]
    );
    return true;
  }

  static async unreadCount(userId) {
    const [rows] = await db.query(
      'SELECT COUNT(*) AS count FROM messages WHERE receiver_id = ? AND is_read = FALSE',
      [userId]
    );
    return rows[0].count;
  }
}

module.exports = Message;