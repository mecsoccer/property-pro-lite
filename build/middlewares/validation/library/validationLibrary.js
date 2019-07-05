"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validate =
/*#__PURE__*/
function () {
  function Validate() {
    _classCallCheck(this, Validate);
  }

  _createClass(Validate, null, [{
    key: "validateTextField",
    value: function validateTextField(field, input) {
      var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
      var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
      var regEx = arguments.length > 4 ? arguments[4] : undefined;
      var example = arguments.length > 5 ? arguments[5] : undefined;
      var required = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
      var message = '';
      /* istanbul ignore if */

      if (!input) {
        message = {
          error: "".concat(field, " must be included"),
          field: field
        };
      } else if (input.length < min || input.length > max) {
        message = {
          error: "".concat(field, " length should be between ").concat(min, " and ").concat(max, " character(s)"),
          field: field
        };
      } else if (regEx.test(input) === false) {
        message = {
          error: "wrong ".concat(field, " format. example ").concat(field, "s: ").concat(example),
          field: field
        };
      } else {
        message = true;
      }

      if (!input && required === false) message = true;
      return message;
    }
  }, {
    key: "validatePasswordField",
    value: function validatePasswordField(field, input, min, max, example) {
      var required = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var message = '';
      var regEx1 = /[a-z]+/g;
      var regEx2 = /[A-Z]+/g;
      var regEx3 = /[0-9]+/g;
      var regEx4 = /[@#$]+/g;
      /* istanbul ignore if */

      if (!input) {
        message = {
          error: "".concat(field, " must be included"),
          field: field
        };
      } else if (input.length < min || input.length > max) {
        message = {
          error: "".concat(field, " length should be between ").concat(min, " and ").concat(max, " character(s)"),
          field: field
        };
      } else if (regEx1.test(input) === false) {
        message = {
          error: "wrong ".concat(field, " format. one lowercase character must be included. example ").concat(field, "s: ").concat(example),
          field: field
        };
      } else if (regEx2.test(input) === false) {
        message = {
          error: "wrong ".concat(field, " format. one uppercase character must be included. example ").concat(field, "s: ").concat(example),
          field: field
        };
      } else if (regEx3.test(input) === false) {
        message = {
          error: "wrong ".concat(field, " format. one numeric character must be included. example ").concat(field, "s: ").concat(example),
          field: field
        };
      } else if (regEx4.test(input) === false) {
        message = {
          error: "wrong ".concat(field, " format. one of (@#$) characters must be included. example ").concat(field, "s: ").concat(example),
          field: field
        };
      } else {
        message = true;
      }

      if (!input && required === false) message = true;
      return message;
    }
  }]);

  return Validate;
}();

var _default = Validate;
exports["default"] = _default;
//# sourceMappingURL=validationLibrary.js.map