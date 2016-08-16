'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var vehicletypeCtrlStub = {
  index: 'vehicletypeCtrl.index',
  show: 'vehicletypeCtrl.show',
  create: 'vehicletypeCtrl.create',
  update: 'vehicletypeCtrl.update',
  destroy: 'vehicletypeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vehicletypeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './vehicletype.controller': vehicletypeCtrlStub
});

describe('Vehicletype API Router:', function() {

  it('should return an express router instance', function() {
    expect(vehicletypeIndex).to.equal(routerStub);
  });

  describe('GET /api/vehicletypes', function() {

    it('should route to vehicletype.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'vehicletypeCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/vehicletypes/:id', function() {

    it('should route to vehicletype.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'vehicletypeCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/vehicletypes', function() {

    it('should route to vehicletype.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'vehicletypeCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/vehicletypes/:id', function() {

    it('should route to vehicletype.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'vehicletypeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/vehicletypes/:id', function() {

    it('should route to vehicletype.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'vehicletypeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/vehicletypes/:id', function() {

    it('should route to vehicletype.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'vehicletypeCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
