'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var servicevehicleCtrlStub = {
  index: 'servicevehicleCtrl.index',
  show: 'servicevehicleCtrl.show',
  create: 'servicevehicleCtrl.create',
  update: 'servicevehicleCtrl.update',
  destroy: 'servicevehicleCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var servicevehicleIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './servicevehicle.controller': servicevehicleCtrlStub
});

describe('Servicevehicle API Router:', function() {

  it('should return an express router instance', function() {
    expect(servicevehicleIndex).to.equal(routerStub);
  });

  describe('GET /api/servicevehicles', function() {

    it('should route to servicevehicle.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'servicevehicleCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/servicevehicles/:id', function() {

    it('should route to servicevehicle.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'servicevehicleCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/servicevehicles', function() {

    it('should route to servicevehicle.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'servicevehicleCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/servicevehicles/:id', function() {

    it('should route to servicevehicle.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'servicevehicleCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/servicevehicles/:id', function() {

    it('should route to servicevehicle.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'servicevehicleCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/servicevehicles/:id', function() {

    it('should route to servicevehicle.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'servicevehicleCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
