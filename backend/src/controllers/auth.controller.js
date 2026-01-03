const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });

  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
};
