"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _propertyController = _interopRequireDefault(require("../controllers/propertyController"));

var _userValidation = _interopRequireDefault(require("../middlewares/validation/userValidation"));

var _propertyValidation = _interopRequireDefault(require("../middlewares/validation/propertyValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateUser = _userValidation["default"].validateUser,
    validateSignin = _userValidation["default"].validateSignin;
var validateProperty = _propertyValidation["default"].validateProperty,
    validatePropertyUpdate = _propertyValidation["default"].validatePropertyUpdate;
var signUpUser = _userController["default"].signUpUser,
    signInUser = _userController["default"].signInUser;
var createNewProperty = _propertyController["default"].createNewProperty,
    getAllProperties = _propertyController["default"].getAllProperties,
    getPropertyById = _propertyController["default"].getPropertyById,
    getPropertiesByType = _propertyController["default"].getPropertiesByType,
    deleteProperty = _propertyController["default"].deleteProperty,
    updateProperty = _propertyController["default"].updateProperty;

var router = _express["default"].Router();

router.post('/auth/signup', validateUser, signUpUser);
router.post('/auth/signin', validateSignin, signInUser);
router.post('/properties', validateProperty, createNewProperty);
router.get('/properties', getAllProperties);
router.get('/properties/:id', getPropertyById);
router.get('/properties/type/:type', getPropertiesByType);
router.patch('/properties/:id', validatePropertyUpdate, updateProperty);
router["delete"]('/properties/:id', deleteProperty);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map