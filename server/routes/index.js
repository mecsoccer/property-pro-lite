import express from 'express';
import UserController from '../controllers/userController';
import PropertyController from '../controllers/propertyController';
import UserValidation from '../middlewares/validation/userValidation';
import PropertyValidation from '../middlewares/validation/propertyValidation';

const { validateUser, validateSignin } = UserValidation;
const { validateProperty } = PropertyValidation;
const { signUpUser, signInUser } = UserController;
const { createNewProperty, getAllProperties, getPropertyById } = PropertyController;

const router = express.Router();

router.post('/auth/signup', validateUser, signUpUser);
router.post('/auth/signin', validateSignin, signInUser);

router.post('/properties', validateProperty, createNewProperty);
router.get('/properties', getAllProperties);
router.get('/properties/:id', getPropertyById);

export default router;
