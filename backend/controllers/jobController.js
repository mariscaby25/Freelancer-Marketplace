const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, client_id: req.user.id });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create job.', error: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const { search, category } = req.query;
    const jobs = await Job.findAll({ search, category, status: 'open' });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs.', error: err.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch job.', error: err.message });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.findByClient(req.user.id);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your jobs.', error: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    if (job.client_id !== req.user.id) {
      return res.status(403).json({ message: 'You can only edit your own jobs.' });
    }
    const updated = await Job.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update job.', error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    if (job.client_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only delete your own jobs.' });
    }
    await Job.delete(req.params.id);
    res.json({ message: 'Job deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job.', error: err.message });
  }
};