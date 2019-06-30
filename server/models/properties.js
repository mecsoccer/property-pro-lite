/* eslint-disable object-property-newline */
/* eslint-disable camelcase */
import PropertyStore from '../db/propertyStore';

class PropertyOperations {
  static createProperty(propertyDetail) {
    return new Promise((resolve) => {
      const {
        price, state, city, address, type, image_url, ownerEmail, ownerPhoneNumber,
      } = propertyDetail;
      const id = String(PropertyStore.length + 1);
      const created_on = new Date();
      const status = 'available';
      const newProperty = {
        id, status, price, state, city, address, type, created_on,
        image_url, ownerEmail, ownerPhoneNumber,
      };

      PropertyStore.push(newProperty);
      const data = {
        id, status, price, state, city, address, type, created_on, image_url,
      };
      resolve({ statusCode: 201, data, status: 'success' });
    });
  }

  static getAll() {
    return new Promise((resolve) => {
      resolve({ statusCode: 200, data: PropertyStore, status: 'success' });
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
}

export default PropertyOperations;
