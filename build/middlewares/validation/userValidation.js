"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _validationLibrary = _interopRequireDefault(require("./library/validationLibrary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validateTextField = _validationLibrary["default"].validateTextField,
    validatePasswordField = _validationLibrary["default"].validatePasswordField;

var Validation =
/*#__PURE__*/
function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, null, [{
    key: "validateUser",
    value: function validateUser(req, res, next) {
      var _req$body = req.body,
          email = _req$body.email,
          first_name = _req$body.first_name,
          last_name = _req$body.last_name,
          password = _req$body.password,
          phoneNumber = _req$body.phoneNumber,
          address = _req$body.address,
          is_admin = _req$body.is_admin;
      var emailValid = validateTextField('email', email, 7, 100, /^[a-z][\w\.-]+@[a-z]+\.[a-z]+$/gi, 'myname@mycompanyname.com');
      var firstNameValid = validateTextField('first_name', first_name, 2, 30, /^[a-z]+$/gi, 'john, james');
      var lastNameValid = validateTextField('last_name', last_name, 2, 30, /^[a-z]+$/gi, 'john, james');
      var passwordValid = validatePasswordField('password', password, 6, 16, 'dkSSD32336##');
      var phoneNumberValid = validateTextField('phoneNumber', phoneNumber, 5, 20, /^(\+234\d+|\d+)$/g, '08093457891');
      var addressValid = validateTextField('address', address, 2, 250, /^[\w\s.,]+$/gi, 'no.36 oniwaya rd. agege, lagos state');

      if (emailValid !== true) {
        res.status(422).json({
          error: emailValid.error,
          status: 'error'
        });
      } else if (firstNameValid !== true) {
        res.status(422).json({
          error: firstNameValid.error,
          status: 'error'
        });
      } else if (lastNameValid !== true) {
        res.status(422).json({
          error: lastNameValid.error,
          status: 'error'
        });
      } else if (passwordValid !== true) {
        res.status(422).json({
          error: passwordValid.error,
          status: 'error'
        });
      } else if (phoneNumberValid !== true) {
        res.status(422).json({
          error: phoneNumberValid.error,
          status: 'error'
        });
      } else if (addressValid !== true) {
        res.status(422).json({
          error: addressValid.error,
          status: 'error'
        });
      } else if (typeof is_admin !== 'boolean') {
        res.status(422).json({
          error: 'is_admin field must be a boolean',
          status: 'error'
        });
      } else {
        var hash = _bcryptjs["default"].hashSync(password, 10);

        req.validData = {
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: hash,
          phoneNumber: phoneNumber,
          address: address,
          is_admin: is_admin
        };
        next();
      }
    }
  }, {
    key: "validateSignin",
    value: function validateSignin(req, res, next) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;
      var emailValid = validateTextField('email', email, 7, 100, /^[a-z][\w\.-]+@[a-z]+\.[a-z]+$/gi, 'myname@mycompanyname.com');

      if (emailValid !== true) {
        res.status(422).json({
          error: emailValid.error,
          status: 'error'
        });
      } else if (!password || typeof password !== 'string' || password === '') {
        res.status(422).json({
          error: 'password invalid',
          status: 'error'
        });
      } else {
        next();
      }
    }
  }]);

  return Validation;
}();

var _default = Validation;
exports["default"] = _default;
//# sourceMappingURL=userValidation.js.map