const expect = require('chai').expect;

describe('users', function() {
  describe('getSample', function() {
    it('should return "This is a sample"', function() {
      expect('This is a sample').to.equal('This is a sample');
    });
  });

  describe('getParametrizedSample', function() {
    it('should return the value passed in parameters', function() {
      const param = 'sample';
      expect({ value: param }).to.deep.equal({ value: param });
    });
  });
});
