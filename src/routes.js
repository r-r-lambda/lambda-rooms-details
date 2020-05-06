const express = require('express');

const getRooms = require('./services/get-rooms');

const router = express.Router();

router.get('/rooms', getRooms);

module.exports = router;
