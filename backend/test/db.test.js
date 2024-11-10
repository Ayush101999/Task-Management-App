const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const connectToMongo = require('../db'); // Adjust the path as necessary

describe('connectToMongo', () => {
  let connectStub;

  before(() => {
    connectStub = sinon.stub(mongoose, 'connect');
  });

  after(() => {
    connectStub.restore();
  });

  it('should call mongoose.connect with the correct URI', () => {
    connectToMongo();
    expect(connectStub.calledOnce).to.be.true;
    expect(connectStub.calledWith('mongodb://127.0.0.1:27017/taskManagement')).to.be.true;
  });

  it('should log "connect successfully"', () => {
    const consoleStub = sinon.stub(console, 'log');
    connectToMongo();
    expect(consoleStub.calledWith('connect sucessfully')).to.be.true;
    consoleStub.restore();
  });
});