const expect = require('chai').expect;

const UsersService = require('../../src/services/users');

describe('users', function() {
  describe('getSample', function() {
    it('should return "This is a sample"', function() {
      expect('This is a sample').to.equal(UsersService.getSample());
    });
  });

  describe('getParametrizedSample', function() {
    it('should return the value passed in parameters', function() {
      const param = 'sample';
      expect({ value: param }).to.deep.equal(UsersService.getParametrizedSample(param));
    });
  });
});
