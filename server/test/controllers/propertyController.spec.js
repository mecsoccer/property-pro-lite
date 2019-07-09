import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import propertyData from '../testData/propertyData';

chai.use(chaiHttp);
const { expect } = chai;

const {
  newValidProperty, invalidOwner, invalidPrice, invalidState, invalidCity,
  invalidAddress, invalidType, invalidImageUrl, validPropertyUpdate,
} = propertyData;

describe('Tests for property Routes', () => {
  describe('tests for post route', () => {
    it('#should return 201 and created object if data is valid', (done) => {
      chai.request(app)
        .post('/api/v1/properties')
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

    it('#should return a 422 and error message for invalid owner', (done) => {
      chai.request(app)
        .post('/api/v1/properties')
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
        .post('/api/v1/properties')
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
        .post('/api/v1/properties')
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
        .post('/api/v1/properties')
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
        .post('/api/v1/properties')
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
        .post('/api/v1/properties')
        .send(invalidType)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('status').that.equals('error');
          done();
        });
    });

    it('#should return a 422 and error message for invalid image url', (done) => {
      chai.request(app)
        .post('/api/v1/properties')
        .send(invalidImageUrl)
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
        .get('/api/v1/properties')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          expect(res.body).to.have.property('data').that.is.an('array');
          done();
        });
    });

    it('should return a specific property', (done) => {
      chai.request(app)
        .get('/api/v1/properties/1')
        .end((err, res) => {
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
          expect(res.body.data).to.have.property('ownerEmail' || 'ownerEmail').that.is.a('string');
          expect(res.body.data).to.have.property('ownerPhoneNumber' || 'ownerPhoneNumber').that.is.a('string');
          done();
        });
    });

    it('should return all properties of a specific type', (done) => {
      chai.request(app)
        .get('/api/v1/properties/type/2 bedroom')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          expect(res.body).to.have.property('data').that.is.an('array');
          done();
        });
    });
  });

  describe('tests for patch route', () => {
    it('should update property advert', (done) => {
      chai.request(app)
        .patch('/api/v1/properties/2')
        .send(validPropertyUpdate)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          expect(res.body).to.have.property('data').that.is.an('object');
          expect(res.body.data).to.have.property('id');
          done();
        });
    });

    it('should return 404 if property id does not exist', (done) => {
      chai.request(app)
        .patch('/api/v1/properties/1000000000')
        .send(validPropertyUpdate)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').that.equals('error');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });

    it('should mark property as sold', (done) => {
      chai.request(app)
        .patch('/api/v1/properties/1/sold')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          expect(res.body).to.have.property('data').that.is.an('object');
          expect(res.body.data).to.have.property('status').that.equals('sold');
          done();
        });
    });
  });

  describe('tests for delete route', () => {
    it('should delete property', (done) => {
      chai.request(app)
        .delete('/api/v1/properties/4')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').that.equals('success');
          expect(res.body).to.have.property('data').that.is.an('object');
          expect(res.body.data).to.have.property('id');
          done();
        });
    });

    it('should return 404 for non-existing id delete property', (done) => {
      chai.request(app)
        .delete('/api/v1/properties/0')
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
