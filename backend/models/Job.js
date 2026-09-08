const db = require('../config/database');

class Job {
  static async create(data) {
    const {
      client_id, title, description, category, skills_required,
      budget_min, budget_max, budget_type, deadline,
    } = data;
    const [result] = await db.query(
      `INSERT INTO jobs
        (client_id, title, description, category, skills_required, budget_min, budget_max, budget_type, deadline)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [client_id, title, description, category, skills_required, budget_min, budget_max, budget_type, deadline]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [rows] = await db.query(
      `SELECT j.*, u.name AS client_name FROM jobs j
       JOIN users u ON j.client_id = u.id WHERE j.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async findAll({ search, category, status } = {}) {
    let query = `SELECT j.*, u.name AS client_name FROM jobs j
                 JOIN users u ON j.client_id = u.id WHERE 1=1`;
    const params = [];
    if (status) {
      query += ' AND j.status = ?';
      params.push(status);
    }
    if (category) {
      query += ' AND j.category = ?';
      params.push(category);
    }
    if (search) {
      query += ' AND (j.title LIKE ? OR j.skills_required LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    query += ' ORDER BY j.created_at DESC';
    const [rows] = await db.query(query, params);
    return rows;
  }

  static async findByClient(clientId) {
    const [rows] = await db.query(
      'SELECT * FROM jobs WHERE client_id = ? ORDER BY created_at DESC',
      [clientId]
    );
    return rows;
  }

  static async update(id, data) {
    const fields = [];
    const params = [];
    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = ?`);
      params.push(value);
    }
    params.push(id);
    await db.query(`UPDATE jobs SET ${fields.join(', ')} WHERE id = ?`, params);
    return this.findById(id);
  }

  static async delete(id) {
    await db.query('DELETE FROM jobs WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Job;