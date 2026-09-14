const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const { authMiddleware } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', fieldController.getAllFields);
router.post('/', authMiddleware, adminMiddleware, fieldController.createField);
router.put('/:id', authMiddleware, adminMiddleware, fieldController.updateField);
router.delete('/:id', authMiddleware, adminMiddleware, fieldController.deleteField);

module.exports = router;