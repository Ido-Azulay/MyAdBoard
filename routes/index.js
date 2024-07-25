//localhost:3000
'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {

    const isAdminLoggedIn = req.session && req.session.isAdminLoggedIn || false;

    // Query users from the database
    const adds = await db.Ad.findAll();

    // Send the users data if it's an API request
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      // Send the users data as a JSON response for the API
      res.json(adds);
    } else {

      // Render the index page with data
      res.render('index', { adds, isAdminLoggedIn  });
    }
  } catch (err) {
    console.error('Error querying users', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
