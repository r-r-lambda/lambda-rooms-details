const express = require('express');

const getRooms = require('./services/get-rooms');
const getRoomsDatails = require('./services/get-rooms-details');

const router = express.Router();

router.get('/rooms/search', getRooms);
router.get('/rooms/:id/', getRoomsDatails);

module.exports = router;
