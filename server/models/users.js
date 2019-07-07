/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import UserStore from '../db/userStore';
import pool from '../db/migration';

class UserOperations {
  static createUser(userDetails) {
    const {
      token, email, first_name, last_name, password, phoneNumber, address, is_admin,
    } = userDetails;

    const hash = bcrypt.hashSync(password, 10);

    const query = {
      text: 'INSERT INTO users(token, email, first_name, last_name, password, phoneNumber, address, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      values: [token, email, first_name, last_name, hash, phoneNumber, address, is_admin],
    };

    return pool.query(query)
      .then(user => user.rows[0]);
  }

  static loginUser(email, password) {
    return new Promise((resolve) => {
      const user = UserStore.filter(item => item.email === email)[0];

      if (!user || !bcrypt.compareSync(password, user.password)) {
        resolve({ statusCode: 401, error: 'incorrect email or password', status: 'error' });
      }

      resolve({ statusCode: 200, data: user, status: 'success' });
    });
  }

  static getUserById(id) {
    return new Promise((resolve) => {
      UserStore.forEach((user) => {
        if (user.id === id) {
          resolve({ statusCode: 200, data: user, status: 'success' });
        }
      });

      resolve({ statusCode: 404, error: 'user does not exist', status: 'error' });
    });
  }
}

export default UserOperations;
