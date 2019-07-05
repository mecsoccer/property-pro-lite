"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _propertyData = _interopRequireDefault(require("../testData/propertyData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var newValidProperty = _propertyData["default"].newValidProperty,
    invalidOwner = _propertyData["default"].invalidOwner,
    invalidPrice = _propertyData["default"].invalidPrice,
    invalidState = _propertyData["default"].invalidState,
    invalidCity = _propertyData["default"].invalidCity,
    invalidAddress = _propertyData["default"].invalidAddress,
    invalidType = _propertyData["default"].invalidType,
    invalidImageUrl = _propertyData["default"].invalidImageUrl,
    validPropertyUpdate = _propertyData["default"].validPropertyUpdate;
describe('Tests for property Routes', function () {
  describe('tests for post route', function () {
    it('#should return 201 and created object if data is valid', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/properties').send(newValidProperty).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data').that.is.an('object');
        expect(res.body).to.have.property('status').that.equals('success');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('status').that.is.a('string');
        expect(res.body.data).to.have.property('type').that.is.a('string');
        expect(res.body.data).to.have.property('price').that.is.a('string');
        expect(res.body.data).to.have.property('state');
        expect(res.body.data).to.have.property('city').that.is.a('string');
        expect(res.body.data).to.have.property('address').that.is.a('string');
        expect(res.body.data).to.have.property('created_on');
        expect(res.body.data).to.have.property('image_url').that.is.a('string');
        done();
      });
    });
    it('#should return a 422 and error message for invalid owner', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/properties').send(invalidOwner).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('#should return a 422 and error message for invalid price', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/properties').send(invalidPrice).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('#should return a 422 and error message for invalid state', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/properties').send(invalidState).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('#should return a 422 and error message for invalid city', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/properties').send(invalidCity).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('#should return a 422 and error message for invalid address', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/properties').send(invalidAddress).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('#should return a 422 and error message for invalid property type', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/properties').send(invalidType).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
    it('#should return a 422 and error message for invalid image url', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/properties').send(invalidImageUrl).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('error').that.is.a('string');
        expect(res.body).to.have.property('status').that.equals('error');
        done();
      });
    });
  });
  describe('tests for get routes', function () {
    it('should return all properties', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/properties').end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').that.equals('success');
        expect(res.body).to.have.property('data').that.is.an('array');
        done();
      });
    });
    it('should return a specific property', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/properties/1').end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').that.equals('success');
        expect(res.body).to.have.property('data').that.is.an('object');
        expect(res.body.data).to.have.property('id').that.is.a('string');
        expect(res.body.data).to.have.property('status').that.is.a('string');
        expect(res.body.data).to.have.property('type').that.is.a('string');
        expect(res.body.data).to.have.property('state').that.is.a('string');
        expect(res.body.data).to.have.property('city').that.is.a('string');
        expect(res.body.data).to.have.property('address').that.is.a('string');
        expect(res.body.data).to.have.property('price').that.is.a('string');
        expect(res.body.data).to.have.property('created_on').that.is.a('string');
        expect(res.body.data).to.have.property('image_url').that.is.a('string');
        expect(res.body.data).to.have.property('ownerEmail').that.is.a('string');
        expect(res.body.data).to.have.property('ownerPhoneNumber').that.is.a('string');
        done();
      });
    });
    it('should return all properties of a specific type', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/properties/type/2 bedroom').end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').that.equals('success');
        expect(res.body).to.have.property('data').that.is.an('array');
        done();
      });
    });
  });
  describe('tests for patch route', function () {
    it('should update property advert', function (done) {
      _chai["default"].request(_index["default"]).patch('/api/v1/properties/2').send(validPropertyUpdate).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').that.equals('success');
        expect(res.body).to.have.property('data').that.is.an('object');
        expect(res.body.data).to.have.property('id');
        done();
      });
    });
    it('should return 404 if property id does not exist', function (done) {
      _chai["default"].request(_index["default"]).patch('/api/v1/properties/1000000000').send(validPropertyUpdate).end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('status').that.equals('error');
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
  });
  describe('tests for delete route', function () {
    it('should delete property', function (done) {
      _chai["default"].request(_index["default"])["delete"]('/api/v1/properties/4').end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').that.equals('success');
        expect(res.body).to.have.property('data').that.is.an('object');
        expect(res.body.data).to.have.property('id');
        done();
      });
    });
    it('should return 404 for non-existing id delete property', function (done) {
      _chai["default"].request(_index["default"])["delete"]('/api/v1/properties/0').end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('status').that.equals('error');
        expect(res.body).to.have.property('error').that.is.a('string');
        done();
      });
    });
  });
});
//# sourceMappingURL=propertyController.spec.js.map