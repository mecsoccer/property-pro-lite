/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
import Validate from './library/validationLibrary';

const { validateTextField } = Validate;

class PropertyValidation {
  static validateProperty(req, res, next) {
    const {
      price, state, city, address, type,
    } = req.body;

    const priceValid = validateTextField('price', price, 2, 30, /^\d+\.\d{2,2}$/gi, '800000.00');
    const stateValid = validateTextField('state', state, 2, 30, /^[a-z]+$/gi, 'abia, imo');
    const cityValid = validateTextField('city', city, 2, 30, /^[a-z]+$/gi, 'umuahia, ikeja');
    const addressValid = validateTextField('address', address, 2, 250, /^[a-z]+[\w\s\.,]+$/gi, 'no.6 some where in lagos');
    const typeValid = validateTextField('type', type, 2, 250, /^[\w\s\.-]+$/gi, '2 bedroom, self contained');

    if (priceValid !== true) {
      res.status(422).json({ error: priceValid.error, status: 'error' });
    } else if (stateValid !== true) {
      res.status(422).json({ error: stateValid.error, status: 'error' });
    } else if (cityValid !== true) {
      res.status(422).json({ error: cityValid.error, status: 'error' });
    } else if (addressValid !== true) {
      res.status(422).json({ error: addressValid.error, status: 'error' });
    } else if (typeValid !== true) {
      res.status(422).json({ error: typeValid.error, status: 'error' });
    } else {
      next();
    }
  }

  static validatePropertyUpdate(req, res, next) {
    const {
      price, state, city, address, type,
    } = req.body;

    const priceValid = validateTextField('price', price, 2, 30, /^\d+\.\d{2,2}$/gi, '800000.00', false);
    const stateValid = validateTextField('state', state, 2, 30, /^[a-z]+$/gi, 'abia, imo', false);
    const cityValid = validateTextField('city', city, 2, 30, /^[a-z]+$/gi, 'umuahia, ikeja', false);
    const addressValid = validateTextField('address', address, 2, 250, /^[a-z]+[\w\s\.,]+$/gi, 'no.6 some where in lagos', false);
    const typeValid = validateTextField('type', type, 2, 250, /^[\w\s\.-]+$/gi, '2 bedroom, self contained', false);

    if (priceValid !== true) {
      res.status(422).json({ error: priceValid.error, status: 'error' });
    } else if (stateValid !== true) {
      res.status(422).json({ error: stateValid.error, status: 'error' });
    } else if (cityValid !== true) {
      res.status(422).json({ error: cityValid.error, status: 'error' });
    } else if (addressValid !== true) {
      res.status(422).json({ error: addressValid.error, status: 'error' });
    } else if (typeValid !== true) {
      res.status(422).json({ error: typeValid.error, status: 'error' });
    } else {
      const validData = {};
      const keys = Object.keys(req.body);
      const supplied = keys.filter(key => req.body[key]);
      supplied.forEach((key) => {
        validData[key] = req.body[key];
      });
      req.validData = validData;
      next();
    }
  }

  static validateId(req, res, next) {
    const { id } = req.params;
    if (Number.isNaN(Number(id))) {
      return res.status(422).json({ status: 'error', error: 'invalid property id' });
    }
    return next();
  }
}

export default PropertyValidation;
