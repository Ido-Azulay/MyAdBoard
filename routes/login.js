//'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models');

// GET route to render the login form
router.get('/', (req, res) => {
    // Check if there's an error flag in the session
    const loginFailed = req.session.loginFailed || false;

    // Clear the error flag in the session
    req.session.loginFailed = false;

    res.render('login', { loginFailed });
});

// POST route to process login
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find an admin with the given username
        const admin = await db.Admin.findOne({
            where: { name: username },
        });

        // If admin not found or password doesn't match, set error flag and redirect to log in with an error
        if (!admin || admin.password !== password) {
            req.session.loginFailed = true;
            res.redirect('/login');
            return;
        }

        // Set a session variable to indicate that the admin is logged in
        req.session.isAdminLoggedIn = true;
        req.session.userName = username;

        // Redirect to the admin dashboard or any other admin page
        res.redirect('/adminDashboard');

    } catch (error) {
        console.error('Error during login:', error);
        req.session.loginFailed = true;
        res.redirect('/login');
    }
});

module.exports = router;
