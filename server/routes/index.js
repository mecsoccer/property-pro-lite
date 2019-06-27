import express from 'express';
import UserController from '../controllers/userController';
import Validation from '../middlewares/validation/userValidation';

const { validateUser } = Validation;
const { signUpUser } = UserController;

const router = express.Router();

router.post('/users', validateUser, signUpUser);

export default router;
