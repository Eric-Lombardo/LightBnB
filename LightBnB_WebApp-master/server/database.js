const { Pool } = require('pg');
const properties = require('./json/properties.json');
const users = require('./json/users.json');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
    SELECT *
    FROM users
    WHERE email = $1;
  `, [email])
    .then(res => res.rows[0]);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
    SELECT *
    FROM users
    WHERE id = $1;
  `, [id])
    .then(res => res.rows[0])
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  let name = user.name;
  let email = user.email;
  let password = user.password;

  return pool.query(`
    INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
    RETURNING *;
  `, [name, email, password]).then(res => res.rows[0])
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT *
  FROM properties
    JOIN reservations ON properties.id = reservations.property_id
    JOIN users ON users.id = reservations.guest_id
  WHERE guest_id = $1
  `, [guest_id]).then(res => res.rows)
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  let paramsArr = [];
  // let queryStr = `SELECT * FROM properties`
  let queryStr = `SELECT properties.*, AVG(rating) AS average_rating FROM properties JOIN property_reviews ON properties.id = property_reviews.property_id`

  // check to make sure options arent empty
  if (!options.city && !options.owner_id && !options.minimum_price_per_night && !options.maximum_price_per_night && !options.minimum_rating) {
    queryStr += ` GROUP BY properties.id`
    return pool.query(queryStr).then(res => res.rows)
  } else {
    queryStr += ` WHERE`
  }

  // city option
  if (options.city) {
    paramsArr.push(options.city);
    queryStr += ` city = $${paramsArr.length}`
  }

  // owner_id option
  if (options.owner_id) {
    paramsArr.push(options.owner_id);
    if (options.city) {
      queryStr += ` AND owner_id = $${paramsArr.length}`
    } else {
      queryStr += ` owner_id = $${paramsArr.length}`
    }
  }

  // 1st check - if min and max are defined
  // if failed - check for min only
  // if failed again - check for max only 
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    paramsArr.push(options.minimum_price_per_night * 100);
    paramsArr.push(options.maximum_price_per_night * 100);
    if (options.city || options.owner_id) {
      queryStr += ` AND cost_per_night BETWEEN $${paramsArr.length - 1} AND $${paramsArr.length}`
    } else {
      queryStr += ` cost_per_night BETWEEN $${paramsArr.length - 1} AND $${paramsArr.length}`
    } 
  } else if (options.minimum_price_per_night) {
      paramsArr.push(options.minimum_price_per_night * 100)
      if (options.city || options.owner_id) {
        queryStr += ` AND cost_per_night >= $${paramsArr.length}`
      } else {
        queryStr += ` cost_per_night >= $${paramsArr.length}`
      }
    }
  else if (options.maximum_price_per_night * 100) {
  paramsArr.push (options.maximum_price_per_night)
    if (options.city || options.owner_id) {
      queryStr += ` AND cost_per_night <= $${paramsArr.length}`
    } else {
      queryStr += ` cost_per_night <= $${paramsArr.length}`
    }
  }
    
  
  queryStr += ` GROUP BY properties.id`

  // rating option and return unique promise
  if (options.minimum_rating) {
    paramsArr.push(options.minimum_rating);
    if (options.city || options.owner_id || options.minimum_price_per_night || options.maximum_price_per_night) {
      queryStr += ` HAVING AVG(rating) >= $${paramsArr.length}`
    }
  }
  
  // finally return compelete promise
  queryStr += ` ORDER BY cost_per_night`
  paramsArr.push(limit)
  queryStr += ` LIMIT $${paramsArr.length}`
  return pool.query(queryStr, paramsArr).then(res => res.rows);

}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
