// adminActions.js
'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models');

//-----------------------------------------------------------------------
// Middleware: Require authentication for all routes in this router
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

//--------------------------------------------------------------------------------

// PATCH endpoint to approve an ad
router.patch('/ad/approve/:id', async (req, res) => {
    const adId = req.params.id;

    try {
        // Find the ad in the database by ID
        const ad = await db.Ad.findByPk(adId);

        // Update the ad to set isApproved to true (or perform any other necessary actions)
        await ad.update({ isApproved: true });
        //location.reload();
        res.status(200).json({ message: 'Ad approved successfully' });

    } catch (error) {
        console.error('Error approving ad:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE endpoint to delete an ad
router.delete('/ad/delete/:id', async (req, res) => {
    const adId = req.params.id;

    try {
        // Find the ad in the database by ID
        const ad = await db.Ad.findByPk(adId);

        // Delete the ad from the database (or perform any other necessary actions)
        await ad.destroy();

        res.status(200).json({ message: 'Ad deleted successfully' });
    } catch (error) {
        console.error('Error deleting ad:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
