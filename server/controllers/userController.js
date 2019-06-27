import userOperations from '../models/users';

const { createUser } = userOperations;

class UserController {
  static signUpUser(req, res) {
    createUser(req.validData)
      .then((result) => {
        if (result.error) return res.status(result.statusCode).json({ status: 'error', error: result.error });
        const { statusCode, data, status } = result;
        res.status(statusCode).json({ status, data });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

export default UserController;
