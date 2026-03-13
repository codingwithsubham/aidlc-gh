const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register new user
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    // Validate unique email
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('Email already exists.');

    // Create new user
    const user = new User({ name, email, password, role });
    await user.save();

    // Respond with new user
    res.status(201).send({ id: user._id, email: user.email });
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).send('Invalid credentials.');
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
};

// Logout user
exports.logout = async (req, res) => {
    // Invalidate token logic here
    res.send('Logged out successfully.');
};

// Other auth functions (refresh, forgot-password, reset-password) can be added here.