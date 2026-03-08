const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/User'); // Assuming you have a User model

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check for user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate tokens
        const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '20m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Save refresh token in database
        user.refreshToken = refreshToken;
        await user.save();

        res.json({ accessToken, refreshToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Logout route
router.post('/logout', async (req, res) => {
    const { token } = req.body;
    try {
        // Remove refresh token from user
        const user = await User.findOneAndUpdate({ refreshToken: token }, { refreshToken: null });
        if (!user) {
            return res.status(400).json({ message: 'Logout unsuccessful' });
        }
        res.json({ message: 'Logout successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;