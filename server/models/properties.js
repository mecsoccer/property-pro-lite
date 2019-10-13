/* eslint-disable object-property-newline */
/* eslint-disable camelcase */
import pool from '../db/migration';

class PropertyOperations {
  static createProperty(propertyDetails) {
    const {
      owner, price, status, state, city, address, type, created_on, image_url,
    } = propertyDetails;

    const text = 'INSERT INTO properties(owner, status, price, state, city, address, type, created_on, image_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const values = [owner, status, price, state, city, address, type, created_on, image_url];

    return pool.query(text, values)
      .then(data => data.rows[0]);
  }

  static getAll() {
    const text = `SELECT properties.id,properties.status,properties.owner,properties.type,properties.state,properties.city,
    properties.address,properties.price,properties.created_on,properties.image_url,users.email As owner_email, users.phone_number As owner_phone_number
      FROM properties INNER JOIN users ON properties.owner=users.id;`;
    return pool.query(text)
      .then(data => data.rows);
  }

  static getAllByType(type) {
    const text = `SELECT properties.id,properties.status,properties.owner,properties.type,properties.state,properties.city,
    properties.address,properties.price,properties.created_on,properties.image_url,users.email As owner_email, users.phone_number As owner_phone_number
      FROM properties INNER JOIN users ON properties.owner=users.id WHERE type=$1;`;
    return pool.query(text, [type])
      .then(data => data.rows);
  }

  static getPropertyById(id) {
    const text = `SELECT properties.id,properties.status,properties.owner,properties.type,properties.state,properties.city,
    properties.address,properties.price,properties.created_on,properties.image_url,users.email As owner_email, users.phone_number As owner_phone_number
      FROM properties INNER JOIN users ON properties.owner=users.id WHERE properties.id=$1;`;
    return pool.query(text, [id])
      .then(data => data.rows[0]);
  }

  static updateOne(id, owner, updates) {
    const {
      price, state, city, address, type, image_url,
    } = updates;

    const text = `UPDATE properties SET price=$1, state=$2,
      city=$3, address=$4, type=$5, image_url=$6 WHERE id=$7 AND owner=$8 returning *;`;
    const values = [price, state, city, address, type, image_url, id, owner];

    return pool.query(text, values)
      .then(data => data.rows[0]);
  }

  static updatePropStatus(id, owner) {
    const text = 'UPDATE properties SET status=$1 WHERE id=$2 AND owner=$3 returning *;';
    return pool.query(text, ['sold', id, owner])
      .then(data => data.rows[0]);
  }

  static deleteOne(id) {
    return pool.query('DELETE FROM properties WHERE id=$1 returning *;', [id])
      .then(data => data.rows[0]);
  }
}

export default PropertyOperations;
