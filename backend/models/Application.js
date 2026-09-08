const db = require('../config/database');

class Application {
  static async create({ job_id, freelancer_id, cover_letter, proposed_rate }) {
    const [result] = await db.query(
      `INSERT INTO applications (job_id, freelancer_id, cover_letter, proposed_rate)
       VALUES (?, ?, ?, ?)`,
      [job_id, freelancer_id, cover_letter, proposed_rate]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [rows] = await db.query(
      `SELECT a.*, j.title AS job_title, j.client_id, u.name AS freelancer_name
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN users u ON a.freelancer_id = u.id
       WHERE a.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async findByJob(jobId) {
    const [rows] = await db.query(
      `SELECT a.*, u.name AS freelancer_name, u.email, f.title, f.hourly_rate, f.skills
       FROM applications a
       JOIN users u ON a.freelancer_id = u.id
       LEFT JOIN freelancers f ON f.user_id = u.id
       WHERE a.job_id = ? ORDER BY a.applied_at DESC`,
      [jobId]
    );
    return rows;
  }

  static async findByFreelancer(freelancerId) {
    const [rows] = await db.query(
      `SELECT a.*, j.title AS job_title, j.status AS job_status, j.budget_min, j.budget_max,
              u.name AS client_name
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN users u ON j.client_id = u.id
       WHERE a.freelancer_id = ? ORDER BY a.applied_at DESC`,
      [freelancerId]
    );
    return rows;
  }

  static async updateStatus(id, status) {
    await db.query('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
    return this.findById(id);
  }

  static async delete(id) {
    await db.query('DELETE FROM applications WHERE id = ?', [id]);
    return true;
  }

  static async alreadyApplied(jobId, freelancerId) {
    const [rows] = await db.query(
      'SELECT id FROM applications WHERE job_id = ? AND freelancer_id = ?',
      [jobId, freelancerId]
    );
    return rows.length > 0;
  }
}

module.exports = Application;