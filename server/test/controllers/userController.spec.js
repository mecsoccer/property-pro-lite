import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import userData from '../testData/userData';

chai.use(chaiHttp);
const { expect } = chai;

const {
  newValidUser, userInvalidEmail, userInvalidFirstName, userInvalidLastName, userInvalidPassword,
  userInvalidAddress, userInvalidPhone, userInvalidIsAdmin,
  wrongSignInEmail, wrongSignInPassword, correctSignin,
} = userData;

let loginToken;

describe('Tests for User Routes', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.correctSignin)
      .end((err, res) => {
        loginToken = res.body.data.token;
        done();
      });
  });

  describe('tests for sign up route', () => {
    it('#should return 201 and created object if data is valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', loginToken)
        .send(newValidUser)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('data').that.is.an('object');
          expect(res.body).to.have.property('status').that.equals('success');
          expect(res.body.data).to.not.have.property('password');
          expect(res.body.data).to.have.property('token').that.is.a('string');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('email').that.is.a('string');
          expect(res.body.data).to.have.property('first_name').that.is.a('string');
          expect(res.body.data).to.have.property('last_name').that.is.a('string');
          expect(res.body.data).to.have.property('phone_number').that.is.a('string');
          expect(res.body.data).to.have.property('is_admin').that.is.a('boolean');
          done();
        });
    });

    it('- should return 409 if email already exists -', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', loginToken)
        .send(newValidUser)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property('error').that.is.an('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('- should return 422, error message and email as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', loginToken)
        .send(userInvalidEmail)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('- should return 422, error message and firstname as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', loginToken)
        .send(userInvalidFirstName)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('- should return 422, error message and last_name as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', loginToken)
        .send(userInvalidLastName)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('- should return 422, error message and password as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', loginToken)
        .send(userInvalidPassword)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('- should return 422, error message and phoneNumber as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', loginToken)
        .send(userInvalidPhone)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('- should return 422, error message and address as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', loginToken)
        .send(userInvalidAddress)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('- should return 422, error message and is_admin as error field -', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Authorization', loginToken)
        .send(userInvalidIsAdmin)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });
  });

  describe('tests for sign in route', () => {
    it('# should login user if data is correct', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(correctSignin)
        .end((err, res) => {
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

    it('# should return 401 and error message for incorrect email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(wrongSignInEmail)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('# should return 401 and error message for incorrect password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(wrongSignInPassword)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });
  });
});
