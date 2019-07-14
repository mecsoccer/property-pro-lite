/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userOperations from '../models/users';

dotenv.config();

const secret = process.env.SECRET_KEY;
const { createUser, loginUser } = userOperations;

class UserController {
  static signUpUser(req, res) {
    const {
      email, first_name, last_name, password, phone_number, address, is_admin,
    } = req.body;
    const newUser = {
      email, first_name, last_name, password, phone_number, address, is_admin,
    };
    createUser(newUser)
      .then((result) => {
        const {
          id, first_name: first, last_name: last, phone_number: phone, email: mail, is_admin: admin,
        } = result;

        const token = jwt.sign({ id, email, first_name, last_name, is_admin }, secret, { expiresIn: '1hr' });

        res.status(201).json({
          status: 'success',
          data: {
            token, id, email: mail, first_name: first, last_name: last, phone_number: phone, is_admin: admin,
          },
        });
      })
      .catch(() => res.status(409).json({ status: 'error', error: 'user already exists' }));
  }

  static signInUser(req, res) {
    const { email, password } = req.body;
    loginUser(email, password)
      .then((result) => {
        if (result.error) return res.status(401).json({ status: 'error', error: 'wrong email or password' });
        const {
          id, first_name, last_name, is_admin,
        } = result;
        const token = jwt.sign({ id, email, first_name, last_name, is_admin }, secret, { expiresIn: '1hr' });
        const data = {
          token, id, email, first_name, last_name, is_admin,
        };

        return res.status(200).json({ status: 'success', data });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ error: 'something went wrong' }));
  }
}

export default UserController;
