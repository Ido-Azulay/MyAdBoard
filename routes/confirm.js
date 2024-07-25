// routes/confirm.js
'use strict';

const express = require('express');
const router = express.Router();

/* GET confirmation page. */
router.get('/:adId/:adTitle', function(req, res, next) {
    // Extract adId and adTitle from the route parameters
    const { adId, adTitle  } = req.params;

    // Render the confirmation page with adId and adTitle
    res.render('confirm', { title: 'Confirmation Page', adId, adTitle });
});

module.exports = router;
