const db = require('../config/database');

class Field {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM fields ORDER BY name ASC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM fields WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ name, icon }) {
    const [result] = await db.query(
      'INSERT INTO fields (name, icon) VALUES (?, ?)',
      [name, icon]
    );
    return this.findById(result.insertId);
  }

  static async update(id, { name, icon }) {
    await db.query('UPDATE fields SET name = ?, icon = ? WHERE id = ?', [name, icon, id]);
    return this.findById(id);
  }

  static async delete(id) {
    await db.query('DELETE FROM fields WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Field;