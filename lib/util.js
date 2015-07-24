var uuid = require('uuid');
var bignum = require('bignum');

/*
 * browserify
if (typeof bignum.isBigNum !== 'function') {
  bignum.isBigNum = function isBigNum(num) {
    return (num instanceof isBigNum.ctor)
  };
  bignum.isBigNum.ctor = bignum(0).constructor;
}
*/

function coerce(num) {
  return (bignum.isBigNum(num) ? num : bignum(num));
}

function number(id) {
  var buffer = new Buffer(16);
  uuid.parse(id, buffer);
  return bignum.fromBuffer(buffer);
}

module.exports = {
  coerce: coerce,
  number: number
};
