const db = require('../config/database');

class User {
  static async create({ name, email, password, role }) {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );
    return { id: result.insertId, name, email, role };
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT id, name, email, role, status, avatar_url, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async findAll({ role } = {}) {
    let query = 'SELECT id, name, email, role, status, avatar_url, created_at FROM users';
    const params = [];
    if (role) {
      query += ' WHERE role = ?';
      params.push(role);
    }
    query += ' ORDER BY created_at DESC';
    const [rows] = await db.query(query, params);
    return rows;
  }

  static async updateStatus(id, status) {
    await db.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
    return this.findById(id);
  }

  static async delete(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return true;
  }
}

module.exports = User;