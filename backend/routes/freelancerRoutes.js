const express = require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancerController');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', freelancerController.getAllFreelancers);
router.get('/me', authMiddleware, authorizeRoles('freelancer'), freelancerController.getMyProfile);
router.put('/me', authMiddleware, authorizeRoles('freelancer'), freelancerController.upsertProfile);
router.get('/:userId', freelancerController.getFreelancerByUserId);

module.exports = router;