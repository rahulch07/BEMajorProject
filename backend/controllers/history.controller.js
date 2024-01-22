// backend/controllers/user.controller.js
const History = require('../models/history.model');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');

// const generateAccessToken = (userId) => {
//   return jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });
// };

exports.history = async (req, res) => {
    //console.log(History);
  const { username } = req.body;

  try {
    const history = await History.find({ username });

    // if (!user || !bcrypt.compareSync(password, user.password)) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    // const accessToken = generateAccessToken(user._id);
    //console.log(user);

    if(!history){
        return res.status(401).json({message: 'No History Found'})
    }
    res.json(history );
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};