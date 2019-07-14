/* eslint-disable camelcase */
import PropertyOperations from '../models/properties';
import cloudinaryUpload from './helpers/cloudinaryUpload';

class PropertyController {
  static async createNewProperty(req, res) {
    const {
      owner, price, state, city, address, type,
    } = req.body;
    let image_url = '';

    /* istanbul ignore if */if (req.file) image_url = await cloudinaryUpload.uploadImage(req.file.path);
    req.body.image_url = image_url;

    PropertyOperations.createProperty({
      owner, price, status: 'available', state, city, address, type, created_on: new Date(), image_url,
    })
      .then((newProperty) => {
        res.status(201).json({ status: 'success', data: newProperty });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ status: 'error', error: 'something went wrong' }));
  }

  static getAllProperties(req, res) {
    PropertyOperations.getAll()
      .then(result => res.status(200).json({ status: 'success', data: result }))
      .catch(/* istanbul ignore next */() => res.status(500).json({ error: 'something went wrong' }));
  }

  static getPropertiesByType(req, res) {
    const { type } = req.query;

    return PropertyOperations.getAllByType(type)
      .then((result) => {
        if (!result[0]) return res.status(404).json({ status: 'error', error: 'property type specified not found' });
        return res.status(200).json({ status: 'success', data: result });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ status: 'error', error: 'something went wrong' }));
  }

  static getSingleProperty(req, res) {
    const { id } = req.params;

    return PropertyOperations.getPropertyById(id)
      .then((result) => {
        if (!result) return res.status(404).json({ status: 'error', error: 'property not found' });
        return res.status(200).json({ status: 'success', data: result });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ status: 'error', error: 'something went wrong' }));
  }

  static async updateProperty(req, res) {
    const { id } = req.params;
    const { id: owner } = req.authData;
    let image_url = '';

    /* istanbul ignore if */if (req.file) image_url = await cloudinaryUpload.uploadImage(req.file.path);
    req.body.image_url = image_url;

    return PropertyOperations.updateOne(id, owner, req.body)
      .then((result) => {
        if (!result) return res.status(404).json({ status: 'error', error: 'id and owner do not match any record' });
        return res.status(200).json({ status: 'success', data: result });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ status: 'error', error: 'something went wrong' }));
  }

  static markPropertySold(req, res) {
    const { id } = req.params;
    const { id: owner } = req.authData;

    return PropertyOperations.updatePropStatus(id, String(owner))
      .then((result) => {
        if (!result) return res.status(404).json({ status: 'error', error: 'id does not exist' });
        return res.status(200).json({ status: 'success', data: result });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ status: 'error', error: 'something went wrong' }));
  }

  static deleteProperty(req, res) {
    const { id } = req.params;

    return PropertyOperations.deleteOne(id)
      .then((result) => {
        if (!result) return res.status(404).json({ status: 'error', error: 'id not available' });
        return res.status(200).json({ status: 'success', data: { message: 'delete successful' } });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ status: 'error', error: 'something went wrong' }));
  }
}

export default PropertyController;
