<<<<<<< HEAD
import express from 'express';
import UserController from '../controllers/userController';
import PropertyController from '../controllers/propertyController';
import Verify from '../middlewares/auth/verify';
import UserValidation from '../middlewares/validation/userValidation';
import PropertyValidation from '../middlewares/validation/propertyValidation';
import multerMiddleware from '../middlewares/multerMiddleware';

const { authVerify } = Verify;
const { validateUser } = UserValidation;
const { validateProperty, validatePropertyUpdate, validateId } = PropertyValidation;
const { signUpUser, signInUser } = UserController;
const {
  createNewProperty, getAllProperties, getSingleProperty, getPropertiesByType,
  deleteProperty, updateProperty, markPropertySold,
} = PropertyController;


const router = express.Router();

router.post('/auth/signup', /* validateUser, */ signUpUser);
router.post('/auth/signin', signInUser);

router.post('/property', authVerify, multerMiddleware, validateProperty, createNewProperty);
router.get('/property', authVerify, getAllProperties);
router.get('/property/type', authVerify, getPropertiesByType);
router.get('/property/:id', authVerify, validateId, getSingleProperty);
router.patch('/property/:id/sold', authVerify, validateId, validatePropertyUpdate, markPropertySold);
router.patch('/property/:id', authVerify, validateId, multerMiddleware, validatePropertyUpdate, updateProperty);
router.delete('/property/:id', authVerify, validateId, deleteProperty);

export default router;
=======
import express from 'express';
import UserController from '../controllers/userController';
import PropertyController from '../controllers/propertyController';
import Verify from '../middlewares/auth/verify';
import UserValidation from '../middlewares/validation/userValidation';
import PropertyValidation from '../middlewares/validation/propertyValidation';
import multerMiddleware from '../middlewares/multerMiddleware';

const { authVerify } = Verify;
const { validateUser } = UserValidation;
const { validateProperty, validatePropertyUpdate, validateId } = PropertyValidation;
const { signUpUser, signInUser } = UserController;
const {
  createNewProperty, getAllProperties, getSingleProperty, getPropertiesByType,
  deleteProperty, updateProperty, markPropertySold,
} = PropertyController;


const router = express.Router();

router.post('/auth/signup', validateUser, signUpUser);
router.post('/auth/signin', signInUser);

router.post('/property', authVerify, multerMiddleware, validateProperty, createNewProperty);
router.get('/property', getAllProperties);
router.get('/property/type', authVerify, getPropertiesByType);
router.get('/property/:id', validateId, getSingleProperty);
router.patch('/property/:id/sold', authVerify, validateId, validatePropertyUpdate, markPropertySold);
router.patch('/property/:id', authVerify, validateId, multerMiddleware, validatePropertyUpdate, updateProperty);
router.delete('/property/:id', authVerify, validateId, deleteProperty);

export default router;
>>>>>>> develop
