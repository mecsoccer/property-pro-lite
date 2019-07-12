/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import pool from '../db/migration';

dotenv.config();

/* istanbul ignore next */const secret = process.env.SECRET_KEY;

class UserOperations {
  static createUser(userDetails) {
    const {
      token, email, first_name, last_name, password, phoneNumber, address, is_admin,
    } = userDetails;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const query = {
      text: 'INSERT INTO users(token, email, first_name, last_name, password, phoneNumber, address, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      values: [token, email, first_name, last_name, hash, phoneNumber, address, is_admin],
    };

    return pool.query(query)
      .then(user => user.rows[0]);
  }

  static loginUser(email, password) {
    return pool.query('SELECT * FROM users WHERE email=$1;', [email])
      .then((user) => {
        /* istanbul ignore if */if (!user.rows[0]) return { error: 'error' };

        const foundUser = user.rows[0];
        const authenticated = bcrypt.compareSync(password, foundUser.password);

        /* istanbul ignore if */if (authenticated) {
          const {
            token, id, first_name, last_name, is_admin,
          } = foundUser;
          const JWT = jwt.sign({ id, email, first_name, last_name, is_admin }, secret, { expiresIn: '1hr' });
          return {
            token, id, email, first_name, last_name, is_admin, JWT,
          };
        }

        return { error: 'error' };
      });
  }
}

export default UserOperations;
