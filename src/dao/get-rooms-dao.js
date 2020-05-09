const pool = require('../config/db-config');

const DatabaseError = require('../errors/database-error');

const getRoomsDao = async (cityCode) => {
  const poolPromise = pool.promise();

  let rooms;

  let connection;
  try {
    connection = await poolPromise.getConnection();

    [rooms] = await connection.query(
      `SELECT r.id, r.property_name, r.price, r.currency, r.rating, r.agency_id, i.url as thumbnail
      FROM room as r
      INNER JOIN room_images as i ON (i.room_id = r.id AND i.is_thumbnail = 1)
      INNER JOIN location as l ON (r.id = l.room_id)
      INNER JOIN city as c ON (c.id = l.city_id)
      WHERE c.code = ?`,
      [cityCode]
    );

    for (room of rooms) {
      const [location] = await connection.query(
        `SELECT l.latitude, l.longitude, c.name, c.code
        FROM location as l
        INNER JOIN city as c ON (c.id = l.city_id)
        WHERE l.room_id = ?`,
        [room.id]
      );

      room.location = location[0];

      const [agency] = await connection.query(
        `SELECT id, name, logo_url
        FROM agency
        WHERE id = ?`,
        [room.agency_id]
      );

      room.agency = agency[0];
      delete room.agency_id;
    }

    connection.release();
  } catch (error) {
    if (connection) {
      connection.release();
    }
    throw new DatabaseError(error);
  }

  return rooms || null;
};

module.exports = getRoomsDao;
