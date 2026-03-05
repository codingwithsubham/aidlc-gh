const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { userType, name, email, phone, password, businessName, address, tax } = req.body;

    // Input validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    
    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long, include at least 1 uppercase letter, 1 number, and 1 special character.' });
    }
    
    // Unique email check (pseudo-code)
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //     return res.status(400).json({ message: 'Email already exists.' });
    // }

    // Create user logic (pseudo-code)
    // const newUser = await User.create({ userType, name, email, phone, password, businessName, address, tax, status: 'PENDING_VERIFICATION' });
    
    res.status(201).json({ message: 'User registered successfully.', user: newUser });
});

module.exports = router;