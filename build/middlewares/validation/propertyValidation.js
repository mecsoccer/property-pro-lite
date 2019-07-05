"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validationLibrary = _interopRequireDefault(require("./library/validationLibrary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validateTextField = _validationLibrary["default"].validateTextField;

var PropertyValidation =
/*#__PURE__*/
function () {
  function PropertyValidation() {
    _classCallCheck(this, PropertyValidation);
  }

  _createClass(PropertyValidation, null, [{
    key: "validateProperty",
    value: function validateProperty(req, res, next) {
      var _req$body = req.body,
          owner = _req$body.owner,
          price = _req$body.price,
          state = _req$body.state,
          city = _req$body.city,
          address = _req$body.address,
          type = _req$body.type,
          image_url = _req$body.image_url;
      var ownerValid = validateTextField('owner', owner, 1, 25, /^\d+$/gi, '1');
      var priceValid = validateTextField('price', price, 2, 30, /^\d+\.\d{2,2}$/gi, '800000.00');
      var stateValid = validateTextField('state', state, 2, 30, /^[a-z]+$/gi, 'abia, imo');
      var cityValid = validateTextField('city', city, 2, 30, /^[a-z]+$/gi, 'umuahia, ikeja');
      var addressValid = validateTextField('address', address, 2, 250, /^[a-z]+[\w\s\.,]+$/gi, 'no.6 some where in lagos');
      var typeValid = validateTextField('type', type, 2, 250, /^[\w\s\.-]+$/gi, '2 bedroom, self contained');
      var imageUrlValid = validateTextField('image_url', image_url, 2, 300, /^.+$/gi, 'https://images.com/img/myimg.png');

      if (ownerValid !== true) {
        res.status(422).json({
          error: ownerValid.error,
          status: 'error'
        });
      } else if (priceValid !== true) {
        res.status(422).json({
          error: priceValid.error,
          status: 'error'
        });
      } else if (stateValid !== true) {
        res.status(422).json({
          error: stateValid.error,
          status: 'error'
        });
      } else if (cityValid !== true) {
        res.status(422).json({
          error: cityValid.error,
          status: 'error'
        });
      } else if (addressValid !== true) {
        res.status(422).json({
          error: addressValid.error,
          status: 'error'
        });
      } else if (typeValid !== true) {
        res.status(422).json({
          error: typeValid.error,
          status: 'error'
        });
      } else if (imageUrlValid !== true) {
        res.status(422).json({
          error: imageUrlValid.error,
          status: 'error'
        });
      } else {
        next();
      }
    }
  }, {
    key: "validatePropertyUpdate",
    value: function validatePropertyUpdate(req, res, next) {
      var _req$body2 = req.body,
          price = _req$body2.price,
          state = _req$body2.state,
          city = _req$body2.city,
          address = _req$body2.address,
          type = _req$body2.type,
          image_url = _req$body2.image_url;
      var priceValid = validateTextField('price', price, 2, 30, /^\d+\.\d{2,2}$/gi, '800000.00', false);
      var stateValid = validateTextField('state', state, 2, 30, /^[a-z]+$/gi, 'abia, imo', false);
      var cityValid = validateTextField('city', city, 2, 30, /^[a-z]+$/gi, 'umuahia, ikeja', false);
      var addressValid = validateTextField('address', address, 2, 250, /^[a-z]+[\w\s\.,]+$/gi, 'no.6 some where in lagos', false);
      var typeValid = validateTextField('type', type, 2, 250, /^[\w\s\.-]+$/gi, '2 bedroom, self contained', false);
      var imageUrlValid = validateTextField('image_url', image_url, 2, 300, /^.+$/gi, 'https://images.com/img/myimg.png', false);

      if (priceValid !== true) {
        res.status(422).json({
          error: priceValid.error,
          status: 'error'
        });
      } else if (stateValid !== true) {
        res.status(422).json({
          error: stateValid.error,
          status: 'error'
        });
      } else if (cityValid !== true) {
        res.status(422).json({
          error: cityValid.error,
          status: 'error'
        });
      } else if (addressValid !== true) {
        res.status(422).json({
          error: addressValid.error,
          status: 'error'
        });
      } else if (typeValid !== true) {
        res.status(422).json({
          error: typeValid.error,
          status: 'error'
        });
      } else if (imageUrlValid !== true) {
        res.status(422).json({
          error: imageUrlValid.error,
          status: 'error'
        });
      } else {
        var validData = {};
        var keys = Object.keys(req.body);
        var supplied = keys.filter(function (key) {
          return req.body[key];
        });
        supplied.forEach(function (key) {
          validData[key] = req.body[key];
        });
        req.validData = validData;
        next();
      }
    }
  }]);

  return PropertyValidation;
}();

var _default = PropertyValidation;
exports["default"] = _default;
//# sourceMappingURL=propertyValidation.js.map