'use strict';

var app = require('../..');
import request from 'supertest';

var newVehicletype;

describe('Vehicletype API:', function() {

  describe('GET /api/vehicletypes', function() {
    var vehicletypes;

    beforeEach(function(done) {
      request(app)
        .get('/api/vehicletypes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vehicletypes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(vehicletypes).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/vehicletypes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vehicletypes')
        .send({
          name: 'New Vehicletype',
          info: 'This is the brand new vehicletype!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newVehicletype = res.body;
          done();
        });
    });

    it('should respond with the newly created vehicletype', function() {
      expect(newVehicletype.name).to.equal('New Vehicletype');
      expect(newVehicletype.info).to.equal('This is the brand new vehicletype!!!');
    });

  });

  describe('GET /api/vehicletypes/:id', function() {
    var vehicletype;

    beforeEach(function(done) {
      request(app)
        .get('/api/vehicletypes/' + newVehicletype._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vehicletype = res.body;
          done();
        });
    });

    afterEach(function() {
      vehicletype = {};
    });

    it('should respond with the requested vehicletype', function() {
      expect(vehicletype.name).to.equal('New Vehicletype');
      expect(vehicletype.info).to.equal('This is the brand new vehicletype!!!');
    });

  });

  describe('PUT /api/vehicletypes/:id', function() {
    var updatedVehicletype;

    beforeEach(function(done) {
      request(app)
        .put('/api/vehicletypes/' + newVehicletype._id)
        .send({
          name: 'Updated Vehicletype',
          info: 'This is the updated vehicletype!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVehicletype = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVehicletype = {};
    });

    it('should respond with the updated vehicletype', function() {
      expect(updatedVehicletype.name).to.equal('Updated Vehicletype');
      expect(updatedVehicletype.info).to.equal('This is the updated vehicletype!!!');
    });

  });

  describe('DELETE /api/vehicletypes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/vehicletypes/' + newVehicletype._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vehicletype does not exist', function(done) {
      request(app)
        .delete('/api/vehicletypes/' + newVehicletype._id)
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
