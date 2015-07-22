var ring = require('../lib/ring');
var expect = require('expect.js');

describe('ring([min,] max)', function () {

  context('when called with max', function () {
    var r = ring(100);

    it('returns a function', function () {
      expect(r).to.be.a(Function);
    });

    it('where .min == <BigNum 0>', function () {
      expect(r.min.eq(0)).to.be.ok();
    });

    it('where .max == <BigNum max>', function () {
      expect(r.max.eq(100)).to.be.ok();
    });

    it('where .size == <BigNum max>', function () {
      expect(r.size.eq(100)).to.be.ok();
    });

    it('where .test() checks if a number is part of the ring', function () {
      expect(r.test(-1)).to.not.be.ok();
      expect(r.test(0)).to.be.ok();
      expect(r.test(99)).to.be.ok();
      expect(r.test(100)).to.not.be.ok();
    });

    it('maps given numbers into the ring [0, max)', function () {
      expect(r(0).eq(0)).to.be.ok();
      expect(r(1).eq(1)).to.be.ok();
      expect(r(-1).eq(99)).to.be.ok();
      expect(r(99).eq(99)).to.be.ok();
      expect(r(100).eq(0)).to.be.ok();
    });
  });

  context('when called with min and max', function () {
    var r = ring(-100, 100);

    it('returns a function', function () {
      expect(r).to.be.a(Function);
    });

    it('where .min == <BigNum min>', function () {
      expect(r.min.eq(-100)).to.be.ok();
    });

    it('where .max == <BigNum max>', function () {
      expect(r.max.eq(100)).to.be.ok();
    });

    it('where .size == <BigNum max - min>', function () {
      expect(r.size.eq(200)).to.be.ok();
    });

    it('where .test() checks if a number is part of the ring', function () {
      expect(r.test(-101)).to.not.be.ok();
      expect(r.test(-100)).to.be.ok();
      expect(r.test(99)).to.be.ok();
      expect(r.test(100)).to.not.be.ok();
    });

    it('maps given numbers into the ring [min, max)', function () {
      expect(r(-100).eq(-100)).to.be.ok();
      expect(r(-99).eq(-99)).to.be.ok();
      expect(r(-101).eq(99)).to.be.ok();
      expect(r(99).eq(99)).to.be.ok();
      expect(r(100).eq(-100)).to.be.ok();
    });
  });

});
