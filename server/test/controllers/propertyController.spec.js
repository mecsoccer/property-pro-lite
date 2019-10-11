import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import propertyData from '../testData/propertyData';
import userData from '../testData/userData';

chai.use(chaiHttp);
const { expect } = chai;

const {
  newValidProperty, invalidOwner, invalidPrice, invalidState, invalidCity,
  invalidAddress, invalidType, validPropertyUpdate,
} = propertyData;

let loginToken;

describe('Tests for property Routes', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.correctSignin)
      .end((err, res) => {
        loginToken = res.body.data.token;
        done();
      });
  });

  describe('tests for post route', () => {
    it('#should return 201 and created object if data is valid', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', loginToken)
        .send(newValidProperty)
        .end((err, res) => {
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

    it('#should return error for invalid token', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', 'loginToken')
        .send(newValidProperty)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('status').that.equals('error');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('#should return error for no authorization header', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .send(newValidProperty)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('status').that.equals('error');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('#should return a 422 and error message for invalid owner', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', loginToken)
        .send(invalidOwner)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('#should return a 422 and error message for invalid price', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', loginToken)
        .send(invalidPrice)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('#should return a 422 and error message for invalid state', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', loginToken)
        .send(invalidState)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('#should return a 422 and error message for invalid city', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', loginToken)
        .send(invalidCity)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('#should return a 422 and error message for invalid address', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', loginToken)
        .send(invalidAddress)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('#should return a 422 and error message for invalid property type', (done) => {
      chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', loginToken)
        .send(invalidType)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });
  });

  describe('tests for get routes', () => {
    it('should return all properties', (done) => {
      chai.request(app)
        .get('/api/v1/property')
        .set('Authorization', loginToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          expect(res.body).to.have.property('data').that.is.an('array');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('status').that.is.a('string');
          expect(res.body.data[0]).to.have.property('address').that.is.a('string');
          expect(res.body.data[0]).to.have.property('city').that.is.a('string');
          expect(res.body.data[0]).to.have.property('state').that.is.a('string');
          expect(res.body.data[0]).to.have.property('price');
          expect(res.body.data[0]).to.have.property('created_on').that.is.a('string');
          expect(res.body.data[0]).to.have.property('image_url').that.is.a('string');
          expect(res.body.data[0]).to.not.have.property('password');
          expect(res.body.data[0]).to.have.property('owner_email').that.is.a('string');
          expect(res.body.data[0]).to.have.property('owner_phone_number').that.is.a('string');
          done();
        });
    });

    it('should return a specific property', (done) => {
      chai.request(app)
        .get('/api/v1/property/1')
        .set('Authorization', loginToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          expect(res.body).to.have.property('data').that.is.an('object');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('status').that.is.a('string');
          expect(res.body.data).to.have.property('type').that.is.a('string');
          expect(res.body.data).to.have.property('state').that.is.a('string');
          expect(res.body.data).to.have.property('city').that.is.a('string');
          expect(res.body.data).to.have.property('address').that.is.a('string');
          expect(res.body.data).to.have.property('price').that.is.a('string');
          expect(res.body.data).to.have.property('created_on').that.is.a('string');
          expect(res.body.data).to.have.property('image_url').that.is.a('string');
          expect(res.body.data).to.not.have.property('password').that.is.a('string');
          expect(res.body.data).to.have.property('owner_email').that.is.a('string');
          expect(res.body.data).to.have.property('owner_phone_number').that.is.a('string');
          done();
        });
    });

    it('should return error for if specific property not found', (done) => {
      chai.request(app)
        .get('/api/v1/property/10')
        .set('Authorization', loginToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').that.equals('error');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('should return all properties of a specific type', (done) => {
      chai.request(app)
        .get('/api/v1/property/type?type=3 bedroom')
        .set('Authorization', loginToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          expect(res.body).to.have.property('data').that.is.an('array');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('status').that.is.a('string');
          expect(res.body.data[0]).to.have.property('address').that.is.a('string');
          expect(res.body.data[0]).to.have.property('city').that.is.a('string');
          expect(res.body.data[0]).to.have.property('state').that.is.a('string');
          expect(res.body.data[0]).to.have.property('price');
          expect(res.body.data[0]).to.have.property('created_on').that.is.a('string');
          expect(res.body.data[0]).to.have.property('image_url').that.is.a('string');
          expect(res.body.data[0]).to.not.have.property('password');
          expect(res.body.data[0]).to.have.property('owner_email').that.is.a('string');
          expect(res.body.data[0]).to.have.property('owner_phone_number').that.is.a('string');
          done();
        });
    });

    it('should return error for a non-existent property type', (done) => {
      chai.request(app)
        .get('/api/v1/property/type?type=none')
        .set('Authorization', loginToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').that.equals('error');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });

  describe('PATCH routes', () => {
    it('should update property advert', (done) => { //
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('Authorization', loginToken)
        .send(validPropertyUpdate)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          expect(res.body).to.have.property('data').that.is.an('object');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('owner');
          expect(res.body.data).to.have.property('status').that.is.a('string');
          expect(res.body.data).to.have.property('address').that.is.a('string');
          expect(res.body.data).to.have.property('city').that.is.a('string');
          expect(res.body.data).to.have.property('state').that.is.a('string');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('created_on').that.is.a('string');
          expect(res.body.data).to.have.property('image_url').that.is.a('string');
          done();
        });
    });

    it('should return 404 if property id does not exist', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1000000')
        .set('Authorization', loginToken)
        .send(validPropertyUpdate)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').that.equals('error');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('should mark property as sold', (done) => { //
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .set('Authorization', loginToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          expect(res.body).to.have.property('data').that.is.an('object');
          expect(res.body.data).to.have.property('status').that.equals('sold');
          expect(res.body.data).to.have.property('type').that.is.a('string');
          expect(res.body.data).to.have.property('state').that.is.a('string');
          expect(res.body.data).to.have.property('city').that.is.a('string');
          expect(res.body.data).to.have.property('address').that.is.a('string');
          expect(res.body.data).to.have.property('price').that.is.a('string');
          expect(res.body.data).to.have.property('created_on').that.is.a('string');
          expect(res.body.data).to.have.property('image_url').that.is.a('string');
          done();
        });
    });

    it('(for mark as sold) should return error for non-existent property', (done) => {
      chai.request(app)
        .patch('/api/v1/property/10/sold')
        .set('Authorization', loginToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').that.equals('error');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('(for mark as sold) should return error for invalid property id', (done) => {
      chai.request(app)
        .patch('/api/v1/property/ten/sold')
        .set('Authorization', loginToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('status').that.equals('error');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });

  describe('tests for delete route', () => {
    it('should delete property', (done) => {
      chai.request(app)
        .delete('/api/v1/property/4')
        .set('Authorization', loginToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          expect(res.body).to.have.property('data').that.is.an('object');
          expect(res.body.data).to.have.property('message').that.is.a('string');
          done();
        });
    });

    it('should return 404 for non-existing id delete property', (done) => {
      chai.request(app)
        .delete('/api/v1/property/0')
        .set('Authorization', loginToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').that.equals('error');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });
});
