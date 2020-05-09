const PropertyRequiedError = require('../errors/property-required-error');
const getRoomsDao = require('../dao/get-rooms-dao');

const getRooms = async (req, res, next) => {
  try {
    const location = req.query.location || null;

    if (!location) {
      throw new PropertyRequiedError('location');
    }

    const rooms = await getRoomsDao(location);

    if (rooms) {
      res.status(200).send(rooms);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error, req, res, next);
  }
};

module.exports = getRooms;
