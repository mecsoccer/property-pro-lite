import PropertyOperations from '../models/properties';
import UserOperations from '../models/users';

class PropertyController {
  static createNewProperty(req, res) {
    UserOperations.getUserById(req.body.owner)
      .then((result) => {
        if (result.error) {
          const { statusCode, error, status } = result;
          return res.status(statusCode).json({ status, error });
        }
        const { email, phoneNumber } = result.data;
        req.body.ownerEmail = email;
        req.body.ownerPhoneNumber = phoneNumber;
        return req.body;
      })
      .then((result) => {
        PropertyOperations.createProperty(result)
          .then((response) => {
            if (response.error) {
              const { statusCode, error, status } = response;
              return res.status(statusCode).json({ status, error });
            }
            const { statusCode, data, status } = response;
            res.status(statusCode).json({ status, data });
          })
          .catch(() => res.status(500).json('service unavailable'));
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ error: 'something went wrong' }));
  }

  static getAllProperties(req, res) {
    PropertyOperations.getAll()
      .then((result) => {
        const { statusCode, data, status } = result;
        res.status(statusCode).json({ status, data });
      })
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
