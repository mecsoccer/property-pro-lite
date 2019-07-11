import express from 'express';
import UserController from '../controllers/userController';
import PropertyController from '../controllers/propertyController';
import UserValidation from '../middlewares/validation/userValidation';
import PropertyValidation from '../middlewares/validation/propertyValidation';

const { validateUser, validateSignin } = UserValidation;
const { validateProperty, validatePropertyUpdate } = PropertyValidation;
const { signUpUser, signInUser } = UserController;
const {
  createNewProperty, getAllProperties, getPropertyById, getPropertiesByType,
  deleteProperty, updateProperty, markPropertySold,
} = PropertyController;

const router = express.Router();

router.post('/auth/signup', validateUser, signUpUser);
router.post('/auth/signin', validateSignin, signInUser);

router.post('/properties', validateProperty, createNewProperty);
router.get('/properties', getAllProperties);
router.get('/properties/:id', getPropertyById);
router.get('/properties/type/:type', getPropertiesByType);
router.patch('/properties/:id', validatePropertyUpdate, updateProperty);
router.patch('/properties/:id/sold', validatePropertyUpdate, markPropertySold);
router.delete('/properties/:id', deleteProperty);

export default router;
