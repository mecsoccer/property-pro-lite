import propertyOperations from '../models/properties';

class PropertyController {
  static createNewProperty(req, res) {
    propertyOperations.createProperty(req.body)
      .then((result) => {
        const { statusCode, data, status } = result;
        res.status(statusCode).json({ status, data });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static getAllProperties(req, res) {
    propertyOperations.getAll()
      .then((result) => {
        const { statusCode, data, status } = result;
        res.status(statusCode).json({ status, data });
      });
  }
}

export default PropertyController;
