const PropertyRequiedError = require('../errors/property-required-error');
const getRoomsDetailsDao = require('../dao/get-rooms-details-dao');

const getRoomsDetails = async (req, res, next) => {
  try {
    const id = req.params.id || null;

    if (!id) {
      throw new PropertyRequiedError('id');
    }

    const room = await getRoomsDetailsDao(id);

    if (room) {
      res.status(200).send(room);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error, req, res, next);
  }
};

module.exports = getRoomsDetails;
