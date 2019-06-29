import express from 'express';
import UserController from '../controllers/userController';
import Validation from '../middlewares/validation/userValidation';

const { validateUser, validateSignin } = Validation;
const { signUpUser, signInUser } = UserController;

const router = express.Router();

router.post('/auth/signup', validateUser, signUpUser);
router.post('/auth/signin', validateSignin, signInUser);

export default router;
