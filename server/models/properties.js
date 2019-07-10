/* eslint-disable object-property-newline */
/* eslint-disable camelcase */
import pool from '../db/migration';
import PropertyStore from '../db/propertyStore';

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
    const text = `SELECT *, users.email As ownerEmail, users.phonenumber As ownerPhoneNumber
      FROM properties INNER JOIN users ON properties.owner=users.id`;
    return pool.query(text)
      .then(data => data.rows);
  }

  static getAllByType(type) {
    return new Promise((resolve) => {
      const properties = PropertyStore.filter(prop => prop.type === type);
      resolve({ statusCode: 200, data: properties, status: 'success' });
    });
  }

  static getOneById(id) {
    return new Promise((resolve) => {
      PropertyStore.forEach((property) => {
        if (property.id === id) {
          resolve({ statusCode: 200, data: property, status: 'success' });
        }
      });

      resolve({ statusCode: 404, error: 'property does not exist', status: 'error' });
    });
  }

  static updateOne(id, updates) {
    return new Promise((resolve) => {
      const property = PropertyStore[id - 1];
      if (id <= 0 || !property) return resolve(false);

      const updateKeys = Object.keys(updates);
      updateKeys.forEach((key) => {
        PropertyStore[id - 1][key] = updates[key];
      });

      return resolve(PropertyStore[id - 1]);
    });
  }

  static deleteOne(id) {
    return new Promise((resolve) => {
      if (id <= 0) return resolve(false);
      const deleted = PropertyStore.splice(id - 1, 1);
      if (!deleted[0]) return resolve(false);
      return resolve(deleted[0]);
    });
  }
}

export default PropertyOperations;
