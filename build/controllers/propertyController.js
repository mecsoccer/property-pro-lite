"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _properties = _interopRequireDefault(require("../models/properties"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PropertyController =
/*#__PURE__*/
function () {
  function PropertyController() {
    _classCallCheck(this, PropertyController);
  }

  _createClass(PropertyController, null, [{
    key: "createNewProperty",
    value: function createNewProperty(req, res) {
      _users["default"].getUserById(req.body.owner).then(function (result) {
        if (result.error) {
          var statusCode = result.statusCode,
              error = result.error,
              status = result.status;
          return res.status(statusCode).json({
            status: status,
            error: error
          });
        }

        var _result$data = result.data,
            email = _result$data.email,
            phoneNumber = _result$data.phoneNumber;
        req.body.ownerEmail = email;
        req.body.ownerPhoneNumber = phoneNumber;
        return req.body;
      }).then(function (result) {
        _properties["default"].createProperty(result).then(function (response) {
          if (response.error) {
            var _statusCode = response.statusCode,
                error = response.error,
                _status = response.status;
            return res.status(_statusCode).json({
              status: _status,
              error: error
            });
          }

          var statusCode = response.statusCode,
              data = response.data,
              status = response.status;
          res.status(statusCode).json({
            status: status,
            data: data
          });
        })["catch"](function () {
          return res.status(500).json('service unavailable');
        });
      })["catch"](
      /* istanbul ignore next */
      function () {
        return res.status(500).json({
          error: 'something went wrong'
        });
      });
    }
  }, {
    key: "getAllProperties",
    value: function getAllProperties(req, res) {
      _properties["default"].getAll().then(function (result) {
        var statusCode = result.statusCode,
            data = result.data,
            status = result.status;
        res.status(statusCode).json({
          status: status,
          data: data
        });
      })["catch"](
      /* istanbul ignore next */
      function () {
        return res.status(500).json({
          error: 'something went wrong'
        });
      });
    }
  }, {
    key: "getPropertiesByType",
    value: function getPropertiesByType(req, res) {
      var type = req.params.type;

      _properties["default"].getAllByType(type).then(function (result) {
        var statusCode = result.statusCode,
            data = result.data,
            status = result.status;
        res.status(statusCode).json({
          status: status,
          data: data
        });
      })["catch"](
      /* istanbul ignore next */
      function () {
        return res.status(500).json({
          error: 'something went wrong'
        });
      });
    }
  }, {
    key: "getPropertyById",
    value: function getPropertyById(req, res) {
      var id = req.params.id;

      _properties["default"].getOneById(id).then(function (result) {
        if (result.error) {
          var _statusCode2 = result.statusCode,
              error = result.error,
              _status2 = result.status;
          return res.status(_statusCode2).json({
            status: _status2,
            error: error
          });
        }

        var statusCode = result.statusCode,
            data = result.data,
            status = result.status;
        res.status(statusCode).json({
          status: status,
          data: data
        });
      })["catch"](
      /* istanbul ignore next */
      function () {
        return res.status(500).json({
          error: 'something went wrong'
        });
      });
    }
  }, {
    key: "updateProperty",
    value: function updateProperty(req, res) {
      var id = req.params.id;

      _properties["default"].updateOne(id, req.validData).then(function (result) {
        if (result === false) return res.status(404).json({
          status: 'error',
          error: 'id does not exist'
        });
        return res.status(200).json({
          status: 'success',
          data: result
        });
      })["catch"](
      /* istanbul ignore next */
      function () {
        return res.status(500).json({
          error: 'something went wrong'
        });
      });
    }
  }, {
    key: "deleteProperty",
    value: function deleteProperty(req, res) {
      var id = req.params.id;

      _properties["default"].deleteOne(id).then(function (result) {
        if (!result) return res.status(404).json({
          status: 'error',
          error: 'id not available'
        });
        return res.status(200).json({
          status: 'success',
          data: result
        });
      })["catch"](
      /* istanbul ignore next */
      function () {
        return res.status(500).json({
          error: 'something went wrong'
        });
      });
    }
  }]);

  return PropertyController;
}();

var _default = PropertyController;
exports["default"] = _default;
//# sourceMappingURL=propertyController.js.map