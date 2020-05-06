const PropertyRequiedError = require('../errors/property-required-error');

const getRooms = async (req, res, next) => {
  try {
    const location = req.query.location || null;
    const checkIn = req.query.checkIn || null;
    const checkOut = req.query.checkOut || null;

    if (!location) {
      throw new PropertyRequiedError('location');
    }

    res.send({
      message: `hola ${location}, checkIn ${checkIn} checkOut ${checkOut}`,
    });
  } catch (error) {
    next(error, req, res, next);
  }
};

module.exports = getRooms;
