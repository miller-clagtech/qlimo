'use strict';

var app = require('../..');
import request from 'supertest';

var newServiceprovider;

describe('Serviceprovider API:', function() {

  describe('GET /api/serviceproviders', function() {
    var serviceproviders;

    beforeEach(function(done) {
      request(app)
        .get('/api/serviceproviders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          serviceproviders = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(serviceproviders).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/serviceproviders', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/serviceproviders')
        .send({
          name: 'New Serviceprovider',
          info: 'This is the brand new serviceprovider!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newServiceprovider = res.body;
          done();
        });
    });

    it('should respond with the newly created serviceprovider', function() {
      expect(newServiceprovider.name).to.equal('New Serviceprovider');
      expect(newServiceprovider.info).to.equal('This is the brand new serviceprovider!!!');
    });

  });

  describe('GET /api/serviceproviders/:id', function() {
    var serviceprovider;

    beforeEach(function(done) {
      request(app)
        .get('/api/serviceproviders/' + newServiceprovider._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          serviceprovider = res.body;
          done();
        });
    });

    afterEach(function() {
      serviceprovider = {};
    });

    it('should respond with the requested serviceprovider', function() {
      expect(serviceprovider.name).to.equal('New Serviceprovider');
      expect(serviceprovider.info).to.equal('This is the brand new serviceprovider!!!');
    });

  });

  describe('PUT /api/serviceproviders/:id', function() {
    var updatedServiceprovider;

    beforeEach(function(done) {
      request(app)
        .put('/api/serviceproviders/' + newServiceprovider._id)
        .send({
          name: 'Updated Serviceprovider',
          info: 'This is the updated serviceprovider!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedServiceprovider = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedServiceprovider = {};
    });

    it('should respond with the updated serviceprovider', function() {
      expect(updatedServiceprovider.name).to.equal('Updated Serviceprovider');
      expect(updatedServiceprovider.info).to.equal('This is the updated serviceprovider!!!');
    });

  });

  describe('DELETE /api/serviceproviders/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/serviceproviders/' + newServiceprovider._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when serviceprovider does not exist', function(done) {
      request(app)
        .delete('/api/serviceproviders/' + newServiceprovider._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
