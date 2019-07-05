"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var createUser = _users["default"].createUser,
    loginUser = _users["default"].loginUser;

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "signUpUser",
    value: function signUpUser(req, res) {
      var _req$validData = req.validData,
          email = _req$validData.email,
          first_name = _req$validData.first_name,
          last_name = _req$validData.last_name,
          password = _req$validData.password,
          phoneNumber = _req$validData.phoneNumber,
          address = _req$validData.address,
          is_admin = _req$validData.is_admin;
      var token = (0, _uuid["default"])();
      var newUser = {
        token: token,
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
        is_admin: is_admin
      };
      createUser(newUser).then(function (result) {
        if (result.error) return res.status(result.statusCode).json({
          status: 'error',
          error: result.error
        });
        var statusCode = result.statusCode,
            data = result.data,
            status = result.status;
        data.token = (0, _uuid["default"])();
        res.status(statusCode).json({
          status: status,
          data: data
        });
      })["catch"](function (err) {
        res.status(500).json(err);
      });
    }
  }, {
    key: "signInUser",
    value: function signInUser(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;
      loginUser(email, password).then(function (result) {
        if (result.error) return res.status(result.statusCode).json({
          status: 'error',
          error: result.error
        });
        var statusCode = result.statusCode,
            data = result.data,
            status = result.status;
        res.status(statusCode).json({
          status: status,
          data: data
        });
      })["catch"](
      /* istanbul ignore next */
      function (err) {
        res.status(500).json(err);
      });
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;
//# sourceMappingURL=userController.js.map