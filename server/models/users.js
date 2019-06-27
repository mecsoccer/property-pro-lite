/* eslint-disable camelcase */
import UserStore from '../db/userStore';

class UserOperations {
  static createUser(userDetail) {
    return new Promise((resolve, reject) => {
      const {
        email, first_name, last_name, password, phoneNumber, address, is_admin,
      } = userDetail;
      // eslint-disable-next-line no-param-reassign
      const noOfUsers = UserStore.length;
      const newUser = {
        id: noOfUsers + 1, email, first_name, last_name, password, phoneNumber, address, is_admin,
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
      const data = { email, first_name, last_name, phoneNumber, address, is_admin };
      resolve({ statusCode: 201, data, status: 'success' });
    });
  }
}

export default UserOperations;
