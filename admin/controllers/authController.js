const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register customer
exports.registerCustomer = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'customer',
    });

    res.status(201).json({ message: 'Registration successful' });

  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};

// Register admin
exports.registerAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'admin',
    });
    // Email verification logic
    res.status(201).json({ msg: 'Admin registered, please verify your email' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
    if (user.role !== 'admin') {
      return res.status(401).json({ message: 'You are not allowed to login from here' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};