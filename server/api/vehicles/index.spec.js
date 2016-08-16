'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var vehiclesCtrlStub = {
  index: 'vehiclesCtrl.index',
  show: 'vehiclesCtrl.show',
  create: 'vehiclesCtrl.create',
  update: 'vehiclesCtrl.update',
  destroy: 'vehiclesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vehiclesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './vehicles.controller': vehiclesCtrlStub
});

describe('Vehicles API Router:', function() {

  it('should return an express router instance', function() {
    expect(vehiclesIndex).to.equal(routerStub);
  });

  describe('GET /api/vehicless', function() {

    it('should route to vehicles.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'vehiclesCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/vehicless/:id', function() {

    it('should route to vehicles.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'vehiclesCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/vehicless', function() {

    it('should route to vehicles.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'vehiclesCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/vehicless/:id', function() {

    it('should route to vehicles.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'vehiclesCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/vehicless/:id', function() {

    it('should route to vehicles.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'vehiclesCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/vehicless/:id', function() {

    it('should route to vehicles.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'vehiclesCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
