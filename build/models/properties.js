"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propertyStore = _interopRequireDefault(require("../db/propertyStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PropertyOperations =
/*#__PURE__*/
function () {
  function PropertyOperations() {
    _classCallCheck(this, PropertyOperations);
  }

  _createClass(PropertyOperations, null, [{
    key: "createProperty",
    value: function createProperty(propertyDetail) {
      return new Promise(function (resolve) {
        var price = propertyDetail.price,
            state = propertyDetail.state,
            city = propertyDetail.city,
            address = propertyDetail.address,
            type = propertyDetail.type,
            image_url = propertyDetail.image_url,
            ownerEmail = propertyDetail.ownerEmail,
            ownerPhoneNumber = propertyDetail.ownerPhoneNumber;
        var id = String(_propertyStore["default"].length + 1);
        var created_on = new Date();
        var status = 'available';
        var newProperty = {
          id: id,
          status: status,
          price: price,
          state: state,
          city: city,
          address: address,
          type: type,
          created_on: created_on,
          image_url: image_url,
          ownerEmail: ownerEmail,
          ownerPhoneNumber: ownerPhoneNumber
        };

        _propertyStore["default"].push(newProperty);

        var data = {
          id: id,
          status: status,
          price: price,
          state: state,
          city: city,
          address: address,
          type: type,
          created_on: created_on,
          image_url: image_url
        };
        resolve({
          statusCode: 201,
          data: data,
          status: 'success'
        });
      });
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return new Promise(function (resolve) {
        resolve({
          statusCode: 200,
          data: _propertyStore["default"],
          status: 'success'
        });
      });
    }
  }, {
    key: "getAllByType",
    value: function getAllByType(type) {
      return new Promise(function (resolve) {
        var properties = _propertyStore["default"].filter(function (prop) {
          return prop.type === type;
        });

        resolve({
          statusCode: 200,
          data: properties,
          status: 'success'
        });
      });
    }
  }, {
    key: "getOneById",
    value: function getOneById(id) {
      return new Promise(function (resolve) {
        _propertyStore["default"].forEach(function (property) {
          if (property.id === id) {
            resolve({
              statusCode: 200,
              data: property,
              status: 'success'
            });
          }
        });

        resolve({
          statusCode: 404,
          error: 'property does not exist',
          status: 'error'
        });
      });
    }
  }, {
    key: "updateOne",
    value: function updateOne(id, updates) {
      return new Promise(function (resolve) {
        var property = _propertyStore["default"][id - 1];
        if (id <= 0 || !property) return resolve(false);
        var updateKeys = Object.keys(updates);
        updateKeys.forEach(function (key) {
          _propertyStore["default"][id - 1][key] = updates[key];
        });
        return resolve(_propertyStore["default"][id - 1]);
      });
    }
  }, {
    key: "deleteOne",
    value: function deleteOne(id) {
      return new Promise(function (resolve) {
        if (id <= 0) return resolve(false);

        var deleted = _propertyStore["default"].splice(id - 1, 1);

        if (!deleted[0]) return resolve(false);
        return resolve(deleted[0]);
      });
    }
  }]);

  return PropertyOperations;
}();

var _default = PropertyOperations;
exports["default"] = _default;
//# sourceMappingURL=properties.js.map