'use strict';

var app = require('../..');
import request from 'supertest';

var newVehicles;

describe('Vehicles API:', function() {

  describe('GET /api/vehicless', function() {
    var vehicless;

    beforeEach(function(done) {
      request(app)
        .get('/api/vehicless')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vehicless = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(vehicless).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/vehicless', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vehicless')
        .send({
          name: 'New Vehicles',
          info: 'This is the brand new vehicles!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newVehicles = res.body;
          done();
        });
    });

    it('should respond with the newly created vehicles', function() {
      expect(newVehicles.name).to.equal('New Vehicles');
      expect(newVehicles.info).to.equal('This is the brand new vehicles!!!');
    });

  });

  describe('GET /api/vehicless/:id', function() {
    var vehicles;

    beforeEach(function(done) {
      request(app)
        .get('/api/vehicless/' + newVehicles._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vehicles = res.body;
          done();
        });
    });

    afterEach(function() {
      vehicles = {};
    });

    it('should respond with the requested vehicles', function() {
      expect(vehicles.name).to.equal('New Vehicles');
      expect(vehicles.info).to.equal('This is the brand new vehicles!!!');
    });

  });

  describe('PUT /api/vehicless/:id', function() {
    var updatedVehicles;

    beforeEach(function(done) {
      request(app)
        .put('/api/vehicless/' + newVehicles._id)
        .send({
          name: 'Updated Vehicles',
          info: 'This is the updated vehicles!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVehicles = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVehicles = {};
    });

    it('should respond with the updated vehicles', function() {
      expect(updatedVehicles.name).to.equal('Updated Vehicles');
      expect(updatedVehicles.info).to.equal('This is the updated vehicles!!!');
    });

  });

  describe('DELETE /api/vehicless/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/vehicless/' + newVehicles._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vehicles does not exist', function(done) {
      request(app)
        .delete('/api/vehicless/' + newVehicles._id)
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
