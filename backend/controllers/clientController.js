const db = require('../config/database');

exports.getAllClients = async (req, res) => {
  try {
    const { search } = req.query;
    let query = `SELECT id, name, avatar_url, created_at FROM users WHERE role = 'client' AND status = 'active'`;
    const params = [];
    if (search) {
      query += ' AND name LIKE ?';
      params.push(`%${search}%`);
    }
    query += ' ORDER BY created_at DESC';
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch clients.', error: err.message });
  }
};