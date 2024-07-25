//api.js:
'use strict';

//This route is responsible for handling the HTTP GET request to retrieve the list
// of ads from the database. It uses Sequelize's findAll method to retrieve all rows
// (ads) from the Ad model.

const express = require('express');
const router = express.Router();

const db = require('../models');


/* GET users listing. */
router.get('/ad', function(req, res, next) {
  return db.Ad.findAll()
      .then((users) => res.send(users))
      .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
        err.error = 1; // some error code for client side
        return res.status(400).send(err) // send the error to the client
      });
});

module.exports = router;
