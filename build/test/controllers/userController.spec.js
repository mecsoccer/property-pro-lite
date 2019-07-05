"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _userData = _interopRequireDefault(require("../testData/userData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var newValidUser = _userData["default"].newValidUser,
    userInvalidEmail = _userData["default"].userInvalidEmail,
    userInvalidFirstName = _userData["default"].userInvalidFirstName,
    userInvalidLastName = _userData["default"].userInvalidLastName,
    userInvalidPassword = _userData["default"].userInvalidPassword,
    userInvalidAddress = _userData["default"].userInvalidAddress,
    userInvalidPhone = _userData["default"].userInvalidPhone,
    userInvalidIsAdmin = _userData["default"].userInvalidIsAdmin,
    invalidSignInPassword = _userData["default"].invalidSignInPassword,
    wrongSignInEmail = _userData["default"].wrongSignInEmail,
    wrongSignInPassword = _userData["default"].wrongSignInPassword,
    correctSignin = _userData["default"].correctSignin;
describe('Tests for User Routes', function () {
  describe('tests for sign up route', function () {
    it('#should return 201 and created object if data is valid', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(newValidUser).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data').that.is.an('object');
        expect(res.body).to.have.property('status').that.equals('success');
        expect(res.body.data).to.not.have.property('password');
        expect(res.body.data).to.have.property('email').that.is.a('string');
        expect(res.body.data).to.have.property('first_name').that.is.a('string');
        expect(res.body.data).to.have.property('last_name').that.is.a('string');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('token').that.is.a('string');
        expect(res.body.data).to.have.property('is_admin').that.is.a('boolean');
        done();
      });
    });
    it('- should return 409 if email already exists -', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(newValidUser).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(409);
        expect(res.body).to.have.property('error').that.is.an('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('- should return 422, error message and email as error field -', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(userInvalidEmail).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('- should return 422, error message and firstname as error field -', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(userInvalidFirstName).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('- should return 422, error message and last_name as error field -', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(userInvalidLastName).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('- should return 422, error message and password as error field -', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(userInvalidPassword).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('- should return 422, error message and phoneNumber as error field -', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(userInvalidPhone).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('- should return 422, error message and address as error field -', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(userInvalidAddress).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('- should return 422, error message and is_admin as error field -', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(userInvalidIsAdmin).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
  });
  describe('tests for sign in route', function () {
    it('# should login user if data is correct', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(correctSignin).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').that.equals('success');
        expect(res.body).to.have.property('data').that.is.an('object');
        expect(res.body.data).to.have.property('token').that.is.a('string');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('first_name').that.is.a('string');
        expect(res.body.data).to.have.property('last_name').that.is.a('string');
        expect(res.body.data).to.have.property('email').that.is.a('string');
        done();
      });
    });
    it('# should return 401 and error message for incorrect email', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(wrongSignInEmail).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('# should return 401 and error message for incorrect password', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(wrongSignInPassword).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('# should return 422 and error message for invalid email -', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(userInvalidEmail).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('# should return 422 and error message for invalid password', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(invalidSignInPassword).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
  });
});
//# sourceMappingURL=userController.spec.js.map