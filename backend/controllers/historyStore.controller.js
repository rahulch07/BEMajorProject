// backend/controllers/historyStore.controller.js
const History = require('../models/history.model');

exports.historyStore = async (req, res) => {
  const { username, pose, time, date } = req.body;

  try {
    const newHistory = new History({
      username,
      pose,
      time,
      date
    });

    await newHistory.save();

    res.status(201).json({ message: 'History stored successfully' });
  } catch (error) {
    console.error('Failed to store history', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
