/* eslint-disable camelcase */
import uniqId from 'uniqid';
import userOperations from '../models/users';

const { createUser, loginUser } = userOperations;

class UserController {
  static signUpUser(req, res) {
    const {
      email, first_name, last_name, password, phoneNumber, address, is_admin,
    } = req.validData;
    const newUser = {
      token: uniqId(), email, first_name, last_name, password, phoneNumber, address, is_admin,
    };
    createUser(newUser)
      .then((result) => {
        const {
          token: tk, id, first_name: first, last_name: last, email: mail, is_admin: admin,
        } = result;
        res.status(201).json({
          status: 'success',
          data: {
            token: tk, id, first_name: first, last_name: last, email: mail, is_admin: admin,
          },
        });
      })
      .catch(() => res.status(409).json({ status: 'error', error: 'user already exists' }));
  }

  static signInUser(req, res) {
    const { email, password } = req.body;
    loginUser(email, password)
      .then((result) => {
        if (result.error) return res.status(result.statusCode).json({ status: 'error', error: result.error });
        const { statusCode, data, status } = result;
        res.status(statusCode).json({ status, data });
      })
      .catch(/* istanbul ignore next */(err) => {
        res.status(500).json(err);
      });
  }
}

export default UserController;
