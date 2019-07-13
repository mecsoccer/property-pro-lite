import express from 'express';
import UserController from '../controllers/userController';
import PropertyController from '../controllers/propertyController';
import Verify from '../middlewares/auth/verify';
import UserValidation from '../middlewares/validation/userValidation';
import PropertyValidation from '../middlewares/validation/propertyValidation';
import multerMiddleware from '../middlewares/multerMiddleware';

const { authVerify } = Verify;
const { validateUser, validateSignin } = UserValidation;
const { validateProperty, validatePropertyUpdate, validateId } = PropertyValidation;
const { signUpUser, signInUser } = UserController;
const {
  createNewProperty, getAllProperties, getSingleProperty, getPropertiesByType,
  deleteProperty, updateProperty, markPropertySold,
} = PropertyController;


const router = express.Router();

router.post('/auth/signup', validateUser, authVerify, signUpUser);
router.post('/auth/signin', validateSignin, signInUser);

router.post('/properties', authVerify, multerMiddleware, validateProperty, createNewProperty);
router.get('/properties', authVerify, getAllProperties);
router.get('/properties/type', authVerify, getPropertiesByType);
router.get('/properties/:id', authVerify, validateId, getSingleProperty);
router.patch('/properties/:id/sold', authVerify, validateId, validatePropertyUpdate, markPropertySold);
router.patch('/properties/:id', authVerify, validateId, multerMiddleware, validatePropertyUpdate, updateProperty);
router.delete('/properties/:id', authVerify, validateId, deleteProperty);

export default router;
