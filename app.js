const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const path = require('path');
const errorHandler = require('./middleware/errorMiddleware');
require('dotenv').config();

// Passport Config
require('./controllers/authController');

const app = express();

// Connect to MongoDB
connectDB();

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const flash = require('connect-flash');

// ... (existing code)

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: true
}));

// Connect Flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.error = req.flash('error');
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/', require('./routes/todoRoutes'));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});