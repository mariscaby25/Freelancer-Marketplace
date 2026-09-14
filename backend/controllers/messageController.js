const Message = require('../models/Message');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  try {
    const { receiver_id, job_id, content } = req.body;
    if (!receiver_id || !content) {
      return res.status(400).json({ message: 'receiver_id and content are required.' });
    }
    const message = await Message.create({
      sender_id: req.user.id,
      receiver_id,
      job_id,
      content,
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message.', error: err.message });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const otherUserId = req.params.userId;
    const messages = await Message.getConversation(req.user.id, otherUserId);
    await Message.markAsRead(otherUserId, req.user.id);
    const otherUser = await User.findById(otherUserId);
    res.json({ messages, otherUser });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch conversation.', error: err.message });
  }
};

exports.getInbox = async (req, res) => {
  try {
    const inbox = await Message.getInbox(req.user.id);
    res.json(inbox);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch inbox.', error: err.message });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Message.unreadCount(req.user.id);
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch unread count.', error: err.message });
  }
};