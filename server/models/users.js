/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import pool from '../db/migration';

class UserOperations {
  static createUser(userDetails) {
    const {
      email, first_name, last_name, password, phone_number, address, is_admin,
    } = userDetails;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const query = {
      text: 'INSERT INTO users(email, first_name, last_name, password, phone_number, address, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [email, first_name, last_name, hash, phone_number, address, is_admin],
    };

    return pool.query(query)
      .then(user => user.rows[0]);
  }

  static loginUser(email, password) {
    return pool.query('SELECT * FROM users WHERE email=$1;', [email])
      .then((user) => {
        if (!user.rows[0]) return { error: 'error' };

        const foundUser = user.rows[0];
        const authenticated = bcrypt.compareSync(password, foundUser.password);

        if (authenticated) return foundUser;
        return { error: 'error' };
      });
  }
}

export default UserOperations;
