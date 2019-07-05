"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _userStore = _interopRequireDefault(require("../db/userStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserOperations =
/*#__PURE__*/
function () {
  function UserOperations() {
    _classCallCheck(this, UserOperations);
  }

  _createClass(UserOperations, null, [{
    key: "createUser",
    value: function createUser(userDetail) {
      return new Promise(function (resolve) {
        var token = userDetail.token,
            email = userDetail.email,
            first_name = userDetail.first_name,
            last_name = userDetail.last_name,
            password = userDetail.password,
            phoneNumber = userDetail.phoneNumber,
            address = userDetail.address,
            is_admin = userDetail.is_admin;
        var id = "".concat(_userStore["default"].length + 1);

        var hash = _bcryptjs["default"].hashSync(password, 10);

        var newUser = {
          token: token,
          id: id,
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: hash,
          phoneNumber: phoneNumber,
          address: address,
          is_admin: is_admin
        };
        var error;

        _userStore["default"].forEach(function (user) {
          if (user.email === email) {
            error = 'user already exists';
            resolve({
              statusCode: 409,
              error: error,
              status: 'error'
            });
          }
        });

        if (error) return;

        _userStore["default"].push(newUser);

        var data = {
          token: token,
          id: id,
          first_name: first_name,
          last_name: last_name,
          email: email,
          is_admin: is_admin
        };
        resolve({
          statusCode: 201,
          data: data,
          status: 'success'
        });
      });
    }
  }, {
    key: "loginUser",
    value: function loginUser(email, password) {
      return new Promise(function (resolve) {
        var user = _userStore["default"].filter(function (item) {
          return item.email === email;
        })[0];

        if (!user || !_bcryptjs["default"].compareSync(password, user.password)) {
          resolve({
            statusCode: 401,
            error: 'incorrect email or password',
            status: 'error'
          });
        }

        resolve({
          statusCode: 200,
          data: user,
          status: 'success'
        });
      });
    }
  }, {
    key: "getUserById",
    value: function getUserById(id) {
      return new Promise(function (resolve) {
        _userStore["default"].forEach(function (user) {
          if (user.id === id) {
            resolve({
              statusCode: 200,
              data: user,
              status: 'success'
            });
          }
        });

        resolve({
          statusCode: 404,
          error: 'user does not exist',
          status: 'error'
        });
      });
    }
  }]);

  return UserOperations;
}();

var _default = UserOperations;
exports["default"] = _default;
//# sourceMappingURL=users.js.map