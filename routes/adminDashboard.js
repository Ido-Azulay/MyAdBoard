// adminDashboard.js
'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models');

//-------------------------------------------------------------------------------------------
// Require authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session.isAdminLoggedIn) {
        next(); // User is authenticated, continue to next middleware
    } else {
        console.log("You are not allowed!");
        res.redirect('/login'); // User is not authenticated, redirect to login page
    }
};

// Apply requireAuth middleware to the entire router
router.use(requireAuth);
// GET route to render the admin dashboard
router.get('/', async (req, res) => {
    try {

        // Fetch non-approved ads
        const nonApprovedAds = await db.Ad.findAll({
            where: { isApproved: false },
        });

        // Fetch approved ads
        const approvedAds = await db.Ad.findAll({
            where: { isApproved: true },
        });

        res.render('adminDashboard', {

            isAdminLoggedIn: req.session.isAdminLoggedIn,
            userName: req.session.userName,
            nonApprovedAds,
            approvedAds,
        });
    } catch (error) {
        console.error('Error fetching ads:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
