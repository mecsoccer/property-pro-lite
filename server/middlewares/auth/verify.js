import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET_KEY;

class Verify {
  static authVerify(req, res, next) {
    const { authorization } = req.headers;

    if (authorization) {
      jwt.verify(authorization, secret, (err, authData) => {
        if (err) return res.status(401).json({ status: 'error', error: 'expired or invalid token, signin again' });
        req.authData = authData;
        return next();
      });
    } else {
      res.status(401).json({ status: 'error', error: 'you have to sign in' });
    }
  }
}

export default Verify;
