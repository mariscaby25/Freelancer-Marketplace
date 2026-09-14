const Field = require('../models/Field');

exports.getAllFields = async (req, res) => {
  try {
    const fields = await Field.findAll();
    res.json(fields);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch fields.', error: err.message });
  }
};

exports.createField = async (req, res) => {
  try {
    const { name, icon } = req.body;
    if (!name || !icon) {
      return res.status(400).json({ message: 'Name and icon are required.' });
    }
    const field = await Field.create({ name, icon });
    res.status(201).json(field);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create field.', error: err.message });
  }
};

exports.updateField = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const field = await Field.update(req.params.id, { name, icon });
    res.json(field);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update field.', error: err.message });
  }
};

exports.deleteField = async (req, res) => {
  try {
    await Field.delete(req.params.id);
    res.json({ message: 'Field deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete field.', error: err.message });
  }
};