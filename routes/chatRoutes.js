const express = require('express');
const router = express.Router();
// const { authenticate } = require('../middleware/authMiddleware');  
const chatController = require('../controllers/chatController');

// Only authenticated users can access chat
// router.use(authenticate);

// Get chat messages
router.get('/:grievanceId/messages', chatController.getChatMessages);

// Send a message
router.post('/:grievanceId/messages', chatController.sendMessage);

module.exports = router;
