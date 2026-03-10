// Password reset endpoint
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');

// Request password reset
router.post('/request-reset', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found.');

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Add logic to send email with reset link to user
    res.status(200).send('Reset link sent to your email.');
});

// Reset password
router.post('/reset/:token', async (req, res) => {
    const user = await User.findOne({
        resetToken: req.params.token,
        resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) return res.status(400).send('Invalid or expired token.');
    user.password = req.body.password; // Ensure it meets the criteria
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).send('Password reset successful.');
});

module.exports = router;