const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register new User
exports.register = async (req, res) => {
    const { role, name, email, phone, password, businessName, sellerName, address, tax } = req.body;

    // Validate required fields
    if (role === 'Customer') {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }
    } else if (role === 'Seller') {
        if (!businessName || !sellerName || !email || !password) {
            return res.status(400).json({ message: 'Business name, seller name, email, and password are required.' });
        }
    }

    // Password validation
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.' });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new User
    const user = new User({
        role,
        name,
        email,
        phone,
        password: hashedPassword,
        status: 'PENDING_VERIFICATION',
        businessName,
        sellerName,
        address,
        tax
    });

    await user.save();

    return res.status(201).json({ message: 'User registered successfully!', user });
};