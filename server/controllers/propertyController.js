/* eslint-disable camelcase */
import PropertyOperations from '../models/properties';

class PropertyController {
  static createNewProperty(req, res) {
    const {
      owner, price, state, city, address, type, image_url,
    } = req.body;

    PropertyOperations.createProperty({
      owner, price, status: 'available', state, city, address, type, created_on: new Date(), image_url,
    })
      .then((newProperty) => {
        res.status(201).json({ status: 'success', data: newProperty });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ error: 'something went wrong' }));
  }

  static getAllProperties(req, res) {
    PropertyOperations.getAll()
      .then(result => res.status(200).json({ status: 'success', data: result }))
      .catch(/* istanbul ignore next */() => res.status(500).json({ error: 'something went wrong' }));
  }

  static getPropertiesByType(req, res) {
    const { type } = req.params;
    PropertyOperations.getAllByType(type)
      .then((result) => {
        const { statusCode, data, status } = result;
        res.status(statusCode).json({ status, data });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ error: 'something went wrong' }));
  }

  static getPropertyById(req, res) {
    const { id } = req.params;
    PropertyOperations.getOneById(id)
      .then((result) => {
        if (result.error) {
          const { statusCode, error, status } = result;
          return res.status(statusCode).json({ status, error });
        }
        const { statusCode, data, status } = result;
        res.status(statusCode).json({ status, data });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ error: 'something went wrong' }));
  }

  static updateProperty(req, res) {
    const { id } = req.params;
    PropertyOperations.updateOne(id, req.validData)
      .then((result) => {
        if (result === false) return res.status(404).json({ status: 'error', error: 'id does not exist' });
        return res.status(200).json({ status: 'success', data: result });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ error: 'something went wrong' }));
  }

  static updatePropertyImage(req, res) {
    const { id } = req.params;
    PropertyOperations.updateOne(id, { status: 'sold' })
      .then((result) => {
        if (result === false) return res.status(404).json({ status: 'error', error: 'id does not exist' });
        return res.status(200).json({ status: 'success', data: result });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ error: 'something went wrong' }));
  }

  static deleteProperty(req, res) {
    const { id } = req.params;
    PropertyOperations.deleteOne(id)
      .then((result) => {
        if (!result) return res.status(404).json({ status: 'error', error: 'id not available' });
        return res.status(200).json({ status: 'success', data: result });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ error: 'something went wrong' }));
  }
}

export default PropertyController;
