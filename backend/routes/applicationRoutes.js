const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, authorizeRoles('freelancer'), applicationController.applyToJob);
router.get('/my-applications', authMiddleware, authorizeRoles('freelancer'), applicationController.getMyApplications);
router.get('/job/:jobId', authMiddleware, authorizeRoles('client', 'admin'), applicationController.getApplicationsForJob);
router.put('/:id/status', authMiddleware, applicationController.updateApplicationStatus);
router.put('/:id/withdraw', authMiddleware, authorizeRoles('freelancer'), applicationController.withdrawApplication);

module.exports = router;