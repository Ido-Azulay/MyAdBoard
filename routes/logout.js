// logout.js
'use strict';

const express = require('express');
const router = express.Router();

//--------------------------------------------------------------------------------------------------
// GET route to handle user logout
router.get('/', (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Redirect to the home page after successful logout
            res.redirect('/');
        }
    });
});

module.exports = router;
