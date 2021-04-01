const expect = require('chai').expect;
const authMiddleware = require('../middleware/is-auth');
const sinon = require('sinon');


describe('Auth middleware', function () {
  it('should throw an error if no header with authorization is available', function () {
    const req = {
      get: function (headerName) {
        return null;
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      'Not authenticated.'
    );
  });

  it('should throw an error if the authorization header is only one string!', function () {
    const req = {
      get: function (headerName) {
        return 'xyz';
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it('should yield a userId after decoding the token', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer test';
      }
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({
      userId: 'abc'
    });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'tester');
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });

  it('should throw an error if the token can not be verified', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});