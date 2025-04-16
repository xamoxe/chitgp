const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  await user.save();
  const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

  res.status(200).json({ token });
};
