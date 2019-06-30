/* eslint-disable camelcase */
import PropertyStore from '../db/propertyStore';

class PropertyOperations {
  static createProperty(propertyDetail) {
    return new Promise((resolve) => {
      const {
        owner, price, state, city, address, type, image_url,
      } = propertyDetail;
      const id = PropertyStore.length + 1;
      const created_on = new Date();
      const status = 'available';
      const newProperty = {
        id, owner, status, price, state, city, address, type, created_on, image_url,
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
}

export default PropertyOperations;
