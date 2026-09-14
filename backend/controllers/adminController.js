const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const db = require('../config/database');

exports.getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const users = await User.findAll({ role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users.', error: err.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['active', 'suspended'].includes(status)) {
      return res.status(400).json({ message: 'Status must be active or suspended.' });
    }
    const user = await User.updateStatus(req.params.id, status);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user status.', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user.', error: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({});
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs.', error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.delete(req.params.id);
    res.json({ message: 'Job listing removed.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job.', error: err.message });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT a.*, j.title AS job_title, u.name AS freelancer_name, c.name AS client_name
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN users u ON a.freelancer_id = u.id
       JOIN users c ON j.client_id = c.id
       ORDER BY a.applied_at DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications.', error: err.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const [[stats]] = await db.query(
      `SELECT
        (SELECT COUNT(*) FROM users WHERE role = 'client') AS total_clients,
        (SELECT COUNT(*) FROM users WHERE role = 'freelancer') AS total_freelancers,
        (SELECT COUNT(*) FROM jobs) AS total_jobs,
        (SELECT COUNT(*) FROM jobs WHERE status = 'open') AS open_jobs,
        (SELECT COUNT(*) FROM jobs WHERE status = 'completed') AS completed_jobs,
        (SELECT COUNT(*) FROM applications) AS total_applications,
        (SELECT COUNT(*) FROM applications WHERE status = 'accepted') AS accepted_applications`
    );
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate reports.', error: err.message });
  }
};