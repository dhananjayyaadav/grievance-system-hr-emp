const ChatMessage = require('../models/chatMessage');

const getChatMessages = async (req, res) => {
  try {
    const grievanceId = req.params.grievanceId;
    const messages = await ChatMessage.find({ grievanceId }).sort({ createdAt: 'asc' });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const grievanceId = req.params.grievanceId;

    const newMessage = new ChatMessage({ grievanceId, userId: req.userId, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getChatMessages, sendMessage };
