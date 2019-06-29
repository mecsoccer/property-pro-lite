/* eslint-disable camelcase */
import uuidv4 from 'uuid';
import userOperations from '../models/users';

const { createUser, loginUser } = userOperations;

class UserController {
  static signUpUser(req, res) {
    const {
      email, first_name, last_name, password, phoneNumber, address, is_admin,
    } = req.validData;
    const token = uuidv4();
    const newUser = {
      token, email, first_name, last_name, password, phoneNumber, address, is_admin,
    };
    createUser(newUser)
      .then((result) => {
        if (result.error) return res.status(result.statusCode).json({ status: 'error', error: result.error });
        const { statusCode, data, status } = result;
        data.token = uuidv4();
        res.status(statusCode).json({ status, data });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
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
