const express = require('express');

const getRoomsDatails = require('./services/get-rooms-details');

const router = express.Router();

router.get('/rooms/:id/', getRoomsDatails);

module.exports = router;
