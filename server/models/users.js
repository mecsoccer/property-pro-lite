/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import UserStore from '../db/userStore';

class UserOperations {
  static createUser(userDetail) {
    return new Promise((resolve) => {
      const {
        token, email, first_name, last_name, password, phoneNumber, address, is_admin,
      } = userDetail;
      const id = `${UserStore.length + 1}`;
      const hash = bcrypt.hashSync(password, 10);
      const newUser = {
        token, id, email, first_name, last_name, password: hash, phoneNumber, address, is_admin,
      };
      let error;

      UserStore.forEach((user) => {
        if (user.email === email) {
          error = 'user already exists';
          resolve({ statusCode: 409, error, status: 'error' });
        }
      });

      if (error) return;
      UserStore.push(newUser);
      const data = { token, id, first_name, last_name, email, is_admin };
      resolve({ statusCode: 201, data, status: 'success' });
    });
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
