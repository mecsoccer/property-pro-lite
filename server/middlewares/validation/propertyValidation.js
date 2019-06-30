/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
import Validate from './library/validationLibrary';

const { validateTextField } = Validate;

class PropertyValidation {
  static validateProperty(req, res, next) {
    const {
      owner, price, state, city, address, type, image_url,
    } = req.body;

    const ownerValid = validateTextField('owner', owner, 1, 25, /^\d+$/gi, '1');
    const priceValid = validateTextField('price', price, 2, 30, /^\d+\.\d{2,2}$/gi, '800000.00');
    const stateValid = validateTextField('state', state, 2, 30, /^[a-z]+$/gi, 'abia, imo');
    const cityValid = validateTextField('city', city, 2, 30, /^[a-z]+$/gi, 'umuahia, ikeja');
    const addressValid = validateTextField('address', address, 2, 250, /^[a-z]+[\w\s\.,]+$/gi, 'no.6 some where in lagos');
    const typeValid = validateTextField('type', type, 2, 250, /^[\w\s\.-]+$/gi, '2 bedroom, self contained');
    const imageUrlValid = validateTextField('image_url', image_url, 2, 300, /^.+$/gi, 'https://images.com/img/myimg.png');

    if (ownerValid !== true) {
      res.status(422).json({ error: ownerValid.error, status: 'error' });
    } else if (priceValid !== true) {
      res.status(422).json({ error: priceValid.error, status: 'error' });
    } else if (stateValid !== true) {
      res.status(422).json({ error: stateValid.error, status: 'error' });
    } else if (cityValid !== true) {
      res.status(422).json({ error: cityValid.error, status: 'error' });
    } else if (addressValid !== true) {
      res.status(422).json({ error: addressValid.error, status: 'error' });
    } else if (typeValid !== true) {
      res.status(422).json({ error: typeValid.error, status: 'error' });
    } else if (imageUrlValid !== true) {
      res.status(422).json({ error: imageUrlValid.error, status: 'error' });
    } else {
      next();
    }
  }
}

export default PropertyValidation;
