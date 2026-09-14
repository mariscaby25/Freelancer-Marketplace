const Application = require('../models/Application');
const Job = require('../models/Job');

exports.applyToJob = async (req, res) => {
  try {
    const { job_id, cover_letter, proposed_rate } = req.body;

    const job = await Job.findById(job_id);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    if (job.status !== 'open') {
      return res.status(400).json({ message: 'This job is no longer accepting applications.' });
    }

    const already = await Application.alreadyApplied(job_id, req.user.id);
    if (already) {
      return res.status(409).json({ message: 'You have already applied to this job.' });
    }

    const application = await Application.create({
      job_id,
      freelancer_id: req.user.id,
      cover_letter,
      proposed_rate,
    });
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit application.', error: err.message });
  }
};

// Client viewing applications for one of their jobs
exports.getApplicationsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    if (job.client_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view these applications.' });
    }
    const applications = await Application.findByJob(req.params.jobId);
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications.', error: err.message });
  }
};

// Freelancer's own application tracker
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.findByFreelancer(req.user.id);
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your applications.', error: err.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'shortlisted', 'accepted', 'rejected', 'withdrawn'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found.' });

    const isOwner = application.client_id === req.user.id;
    const isApplicant = String(req.user.id) === String(application.freelancer_id);
    if (!isOwner && !isApplicant && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this application.' });
    }

    const updated = await Application.updateStatus(req.params.id, status);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update application.', error: err.message });
  }
};

exports.withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found.' });
    if (String(application.freelancer_id) !== String(req.user.id)) {
      return res.status(403).json({ message: 'You can only withdraw your own applications.' });
    }
    const updated = await Application.updateStatus(req.params.id, 'withdrawn');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to withdraw application.', error: err.message });
  }
};