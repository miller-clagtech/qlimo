'use strict';

var app = require('../..');
import request from 'supertest';

var newServicevehicle;

describe('Servicevehicle API:', function() {

  describe('GET /api/servicevehicles', function() {
    var servicevehicles;

    beforeEach(function(done) {
      request(app)
        .get('/api/servicevehicles')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          servicevehicles = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(servicevehicles).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/servicevehicles', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/servicevehicles')
        .send({
          name: 'New Servicevehicle',
          info: 'This is the brand new servicevehicle!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newServicevehicle = res.body;
          done();
        });
    });

    it('should respond with the newly created servicevehicle', function() {
      expect(newServicevehicle.name).to.equal('New Servicevehicle');
      expect(newServicevehicle.info).to.equal('This is the brand new servicevehicle!!!');
    });

  });

  describe('GET /api/servicevehicles/:id', function() {
    var servicevehicle;

    beforeEach(function(done) {
      request(app)
        .get('/api/servicevehicles/' + newServicevehicle._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          servicevehicle = res.body;
          done();
        });
    });

    afterEach(function() {
      servicevehicle = {};
    });

    it('should respond with the requested servicevehicle', function() {
      expect(servicevehicle.name).to.equal('New Servicevehicle');
      expect(servicevehicle.info).to.equal('This is the brand new servicevehicle!!!');
    });

  });

  describe('PUT /api/servicevehicles/:id', function() {
    var updatedServicevehicle;

    beforeEach(function(done) {
      request(app)
        .put('/api/servicevehicles/' + newServicevehicle._id)
        .send({
          name: 'Updated Servicevehicle',
          info: 'This is the updated servicevehicle!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedServicevehicle = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedServicevehicle = {};
    });

    it('should respond with the updated servicevehicle', function() {
      expect(updatedServicevehicle.name).to.equal('Updated Servicevehicle');
      expect(updatedServicevehicle.info).to.equal('This is the updated servicevehicle!!!');
    });

  });

  describe('DELETE /api/servicevehicles/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/servicevehicles/' + newServicevehicle._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when servicevehicle does not exist', function(done) {
      request(app)
        .delete('/api/servicevehicles/' + newServicevehicle._id)
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
