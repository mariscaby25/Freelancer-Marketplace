const db = require('../config/database');

class Freelancer {
  static async createOrUpdate(userId, data) {
    const existing = await this.findByUserId(userId);
    const {
      title, bio, skills, hourly_rate, portfolio_url,
      location, years_experience,
    } = data;

    if (existing) {
      await db.query(
        `UPDATE freelancers SET title=?, bio=?, skills=?, hourly_rate=?, portfolio_url=?,
         location=?, years_experience=? WHERE user_id=?`,
        [title, bio, skills, hourly_rate, portfolio_url, location, years_experience, userId]
      );
    } else {
      await db.query(
        `INSERT INTO freelancers
          (user_id, title, bio, skills, hourly_rate, portfolio_url, location, years_experience)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, title, bio, skills, hourly_rate, portfolio_url, location, years_experience]
      );
    }
    return this.findByUserId(userId);
  }

  static async findByUserId(userId) {
    const [rows] = await db.query(
      `SELECT f.*, u.name, u.email, u.avatar_url AS avatar_url FROM freelancers f
       JOIN users u ON f.user_id = u.id WHERE f.user_id = ?`,
      [userId]
    );
    return rows[0];
  }

  static async findAll({ search, skill } = {}) {
    let query = `SELECT
        f.id, f.user_id, f.title, f.bio, f.skills, f.hourly_rate,
        f.portfolio_url, f.location, f.years_experience, f.created_at, f.updated_at,
        u.name, u.email, u.status, u.avatar_url
      FROM freelancers f
      JOIN users u ON f.user_id = u.id WHERE u.status = 'active'`;
    const params = [];
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