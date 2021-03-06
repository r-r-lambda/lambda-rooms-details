const pool = require('../config/db-config');

const DatabaseError = require('../errors/database-error');

const getRoomsDetailsDao = async (id) => {
  const poolPromise = pool.promise();

  let room;

  let connection;
  try {
    connection = await poolPromise.getConnection();

    [room] = await connection.query(
      `SELECT id, property_name, price, currency, rating, agency_id
      FROM room
      WHERE id = ?`,
      [id]
    );

    if (!room[0]) {
      connection.release();
      return null;
    }

    room = room[0];

    const [images] = await connection.query(
      `SELECT url
      FROM room_images
      WHERE is_thumbnail = 0 AND room_id = ?`,
      [room.id]
    );

    room.images = images;

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

    const [resServices] = await connection.query(
      `SELECT s.name
      FROM service as s
      INNER JOIN room_services as rs ON (s.id = rs.service_id)
      WHERE rs.room_id = ?`,
      [room.id]
    );

    const services = resServices.map((service) => service.name);

    room.services = services;

    connection.release();
  } catch (error) {
    if (connection) {
      connection.release();
    }
    throw new DatabaseError(error);
  }

  return room || null;
};

module.exports = getRoomsDetailsDao;
