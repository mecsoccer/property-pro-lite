/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import Validate from './library/validationLibrary';


const { validateTextField, validatePasswordField } = Validate;

class Validation {
  static validateUser(req, res, next) {
    const {
      email, first_name, last_name, password, phoneNumber, address, is_admin,
    } = req.body;

    const emailValid = validateTextField('email', email, 7, 100, /^[a-z][\w\.-]+@[a-z]+\.[a-z]+$/gi, 'myname@mycompanyname.com');
    const firstNameValid = validateTextField('first_name', first_name, 2, 30, /^[a-z]+$/gi, 'john, james');
    const lastNameValid = validateTextField('last_name', last_name, 2, 30, /^[a-z]+$/gi, 'john, james');
    const passwordValid = validatePasswordField('password', password, 6, 16, 'dkSSD32336##');
    const phoneNumberValid = validateTextField('phoneNumber', phoneNumber, 5, 20, /^(\+234\d+|\d+)$/g, '08093457891');
    const addressValid = validateTextField('address', address, 2, 250, /^[\w\s.,]+$/gi);

    if (emailValid !== true) {
      res.status(422).json({ error: emailValid.error, field: emailValid.field });
    } else if (firstNameValid !== true) {
      res.status(422).json({ error: firstNameValid.error, field: firstNameValid.field });
    } else if (lastNameValid !== true) {
      res.status(422).json({ error: lastNameValid.error, field: lastNameValid.field });
    } else if (passwordValid !== true) {
      res.status(422).json({ error: passwordValid.error, field: passwordValid.field });
    } else if (phoneNumberValid !== true) {
      res.status(422).json({ error: phoneNumberValid.error, field: phoneNumberValid.field });
    } else if (addressValid !== true) {
      res.status(422).json({ error: addressValid.error, field: addressValid.field });
    } else if (typeof is_admin !== 'boolean') {
      res.status(422).json({ error: 'is_admin field must be a boolean', field: 'is_admin' });
    } else {
      const hash = bcrypt.hashSync(password, 10);
      req.validData = {
        email, first_name, last_name, password: hash, phoneNumber, address, is_admin,
      };
      next();
    }
  }
}

export default Validation;