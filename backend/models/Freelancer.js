const db = require('../config/database');

class Freelancer {
  static async createOrUpdate(userId, data) {
    const existing = await this.findByUserId(userId);
    const {
      title, bio, skills, hourly_rate, portfolio_url,
      location, years_experience, field_id,
    } = data;

    if (existing) {
      await db.query(
        `UPDATE freelancers SET title=?, bio=?, skills=?, hourly_rate=?, portfolio_url=?,
         location=?, years_experience=?, field_id=? WHERE user_id=?`,
        [title, bio, skills, hourly_rate, portfolio_url, location, years_experience, field_id || null, userId]
      );
    } else {
      await db.query(
        `INSERT INTO freelancers
          (user_id, title, bio, skills, hourly_rate, portfolio_url, location, years_experience, field_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, title, bio, skills, hourly_rate, portfolio_url, location, years_experience, field_id || null]
      );
    }
    return this.findByUserId(userId);
  }

  static async findByUserId(userId) {
    const [rows] = await db.query(
      `SELECT f.*, u.name, u.email, u.avatar_url, fl.name AS field_name, fl.icon AS field_icon
       FROM freelancers f
       JOIN users u ON f.user_id = u.id
       LEFT JOIN fields fl ON f.field_id = fl.id
       WHERE f.user_id = ?`,
      [userId]
    );
    return rows[0];
  }

  static async findAll({ search, skill, field_id } = {}) {
    let query = `SELECT
        f.id, f.user_id, f.title, f.bio, f.skills, f.hourly_rate,
        f.portfolio_url, f.location, f.years_experience, f.field_id, f.created_at, f.updated_at,
        u.name, u.email, u.status, u.avatar_url,
        fl.name AS field_name, fl.icon AS field_icon
      FROM freelancers f
      JOIN users u ON f.user_id = u.id
      LEFT JOIN fields fl ON f.field_id = fl.id
      WHERE u.status = 'active'`;
    const params = [];
    if (field_id) {
      query += ' AND f.field_id = ?';
      params.push(field_id);
    }
    if (skill) {
      query += ' AND f.skills LIKE ?';
      params.push(`%${skill}%`);
    }
    if (search) {
      query += ' AND (u.name LIKE ? OR f.title LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    query += ' ORDER BY f.created_at DESC';
    const [rows] = await db.query(query, params);
    return rows;
  }
}

module.exports = Freelancer;