const Freelancer = require('../models/Freelancer');

exports.upsertProfile = async (req, res) => {
  try {
    const profile = await Freelancer.createOrUpdate(req.user.id, req.body);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save profile.', error: err.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Freelancer.findByUserId(req.user.id);
    if (!profile) return res.status(404).json({ message: 'Profile not created yet.' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile.', error: err.message });
  }
};

exports.getAllFreelancers = async (req, res) => {
  try {
    const { search, skill } = req.query;
    const freelancers = await Freelancer.findAll({ search, skill });
    res.json(freelancers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch freelancers.', error: err.message });
  }
};

exports.getFreelancerByUserId = async (req, res) => {
  try {
    const profile = await Freelancer.findByUserId(req.params.userId);
    if (!profile) return res.status(404).json({ message: 'Freelancer not found.' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch freelancer.', error: err.message });
  }
};