/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userOperations from '../models/users';

dotenv.config();

const secret = process.env.SECRET_KEY;
const { createUser, loginUser } = userOperations;

class UserController {
  static signUpUser(req, res) {
    createUser(req.body)
      .then((result) => {
        const {
          id, first_name, last_name, phone_number, email, role,
        } = result;

        const token = jwt.sign({ id, email, first_name, last_name, role }, secret, { expiresIn: '1hr' });

        res.status(201).json({
          status: 'success',
          data: {
            token, id, email, first_name, last_name, phone_number, role,
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
          id, first_name, last_name, role,
        } = result;
        const token = jwt.sign({ id, email, first_name, last_name, role }, secret, { expiresIn: '1hr' });
        const data = {
          token, id, email, first_name, last_name, role,
        };

        return res.status(200).json({ status: 'success', data });
      })
      .catch(/* istanbul ignore next */() => res.status(500).json({ error: 'something went wrong' }));
  }
}

export default UserController;
