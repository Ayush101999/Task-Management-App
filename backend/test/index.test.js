const server = require('../index'); // Adjust the path as necessary
const chai = require('chai');
const expect = chai.expect;


describe('Server', () => {
  it('should start the server and listen on the specified port', (done) => {
    expect(server.address().port).to.equal(5000);
    done();
  });
});

after(() => {
  server.close();
});