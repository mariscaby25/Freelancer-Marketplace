const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', jobController.getAllJobs);
router.get('/my-jobs', authMiddleware, authorizeRoles('client'), jobController.getMyJobs);
router.get('/:id', jobController.getJobById);
router.post('/', authMiddleware, authorizeRoles('client'), jobController.createJob);
router.put('/:id', authMiddleware, authorizeRoles('client'), jobController.updateJob);
router.delete('/:id', authMiddleware, jobController.deleteJob);

module.exports = router;