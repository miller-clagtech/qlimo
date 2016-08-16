'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var serviceproviderCtrlStub = {
  index: 'serviceproviderCtrl.index',
  show: 'serviceproviderCtrl.show',
  create: 'serviceproviderCtrl.create',
  update: 'serviceproviderCtrl.update',
  destroy: 'serviceproviderCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var serviceproviderIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './serviceprovider.controller': serviceproviderCtrlStub
});

describe('Serviceprovider API Router:', function() {

  it('should return an express router instance', function() {
    expect(serviceproviderIndex).to.equal(routerStub);
  });

  describe('GET /api/serviceproviders', function() {

    it('should route to serviceprovider.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'serviceproviderCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/serviceproviders/:id', function() {

    it('should route to serviceprovider.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'serviceproviderCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/serviceproviders', function() {

    it('should route to serviceprovider.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'serviceproviderCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/serviceproviders/:id', function() {

    it('should route to serviceprovider.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'serviceproviderCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/serviceproviders/:id', function() {

    it('should route to serviceprovider.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'serviceproviderCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/serviceproviders/:id', function() {

    it('should route to serviceprovider.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'serviceproviderCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
