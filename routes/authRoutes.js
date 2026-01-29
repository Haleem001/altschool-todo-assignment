const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Assuming bcryptjs is installed as per package.json, though controller used bcrypt. Checking package.json... package.json has bcryptjs. Controller had bcrypt. I should stick to one. Controller 'require' was bcrypt. I will use bcryptjs to match package.json.

// Signup Page
router.get('/signup', (req, res) => res.render('signup', { title: 'Signup', user: req.user }));

// Signup Handle
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if user exists
        let user = await User.findOne({ username });
        if (user) {
            return res.render('signup', {
                error: 'User already exists',
                title: 'Signup',
                user: null
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            password: hashedPassword
        });

        await user.save();
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.render('signup', { error: 'Server Error', title: 'Signup', user: null });
    }
});

// Login Page
router.get('/login', (req, res) => res.render('login', { title: 'Login', user: req.user }));

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/auth/login');
    });
});

module.exports = router;
