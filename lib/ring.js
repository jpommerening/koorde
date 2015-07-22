var bignum = require('bignum');

module.exports = ring;

function coerce(num) {
  return (bignum.isBigNum(num) ? num : bignum(num));
}

/**
 * [min, max)
 */
function ring(min, max) {

  if (typeof max === 'undefined') {
    max = min;
    min = 0;
  }

  map.min = min = coerce(min);
  map.max = max = coerce(max);
  map.size = max.sub(min);

  function map(num) {
    num = coerce(num);

    if (min.gt(num)) {
      return max.sub(min.sub(num).mod(map.size));
    } else if (max.le(num)) {
      return min.add(num.sub(min).mod(map.size));
    }

    return num;
  }

  map.test = function test(num) {
    return min.le(num) && max.gt(num);
  };

  return map;
}
