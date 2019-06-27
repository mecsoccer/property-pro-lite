import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import userData from './testData/userData';

chai.use(chaiHttp);
const { expect } = chai;

const {
  newValidUser, userInvalidEmail, userInvalidFirstName, userInvalidLastName,
  userInvalidPassword, userInvalidPhone, userInvalidIsAdmin,
} = userData;

describe('Tests for User Routes', () => {
  describe('tests for post routes', () => {
    it('#should return 201 and created object if data is valid', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(newValidUser)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('data').that.is.an('object');
          expect(res.body.data).to.not.have.property('password');
          expect(res.body.data).to.have.property('email').that.is.a('string');
          expect(res.body.data).to.have.property('first_name').that.is.a('string');
          expect(res.body.data).to.have.property('last_name').that.is.a('string');
          expect(res.body.data).to.have.property('phoneNumber').that.is.a('string');
          expect(res.body.data).to.have.property('address').that.is.a('string');
          expect(res.body.data).to.have.property('is_admin').that.is.a('boolean');
          done();
        });
    });

    it('- should return 409 if email already exists -', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(newValidUser)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property('error').that.is.an('string');
          done();
        });
    });

    it('- should return 422, error message and email as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(userInvalidEmail)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('field').that.equals('email');
          done();
        });
    });

    it('- should return 422, error message and firstname as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(userInvalidFirstName)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('field').that.equals('first_name');
          done();
        });
    });

    it('- should return 422, error message and last_name as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(userInvalidLastName)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('field').that.equals('last_name');
          done();
        });
    });

    it('- should return 422, error message and password as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(userInvalidPassword)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('field').that.equals('password');
          done();
        });
    });

    it('- should return 422, error message and phoneNumber as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(userInvalidPhone)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('field').that.equals('phoneNumber');
          done();
        });
    });

    it('- should return 422, error message and is_admin as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(userInvalidIsAdmin)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('field').that.equals('is_admin');
          done();
        });
    });
  });
});
