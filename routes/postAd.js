// routes/add.js
'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models');

//---------------------------------------------------------------------------------------------------
/* GET form page. */
router.get('/', function(req, res, next) {
    res.render('postAd', { title: 'Post New Ad' });
});

/* POST to add a new user. */
router.post('/', async function(req, res, next) {
    try {
        // Extract form data from request body
        const { title, description, price ,phone, email } = req.body;

        //for price number with comma
        const cleanedPrice = price.replace(/[^0-9.-]/g, '');

        // Create a new user using Sequelize model
        const newAd = await db.Ad.create({
            title,
            description,
            price : cleanedPrice,
            phone,
            email,
        });
        // Redirect to the home page after adding the user
        console.log(newAd);
        res.redirect(`/confirm/${newAd.id}/${newAd.title}`);
    } catch (error) {
        console.error('Error adding ad:', error);
        // Handle the error and send an appropriate response
        res.status(500).send('Error adding ad, please try again later');
    }
});

module.exports = router;
