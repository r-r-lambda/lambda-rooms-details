const pool = require('../config/db-config');

const DatabaseError = require('../errors/database-error');

const getQuoteDao = async (id) => {
  const poolPromise = pool.promise();

  let result;

  try {
    [
      result,
    ] = await poolPromise.query(
      'SELECT id, quote, image FROM quote WHERE id = ?',
      [id]
    );
  } catch (error) {
    throw new DatabaseError(error);
  }

  return result[0] || null;
};

module.exports = getQuoteDao;
