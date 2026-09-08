const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, messageController.sendMessage);
router.get('/inbox', authMiddleware, messageController.getInbox);
router.get('/unread-count', authMiddleware, messageController.getUnreadCount);
router.get('/:userId', authMiddleware, messageController.getConversation);

module.exports = router;