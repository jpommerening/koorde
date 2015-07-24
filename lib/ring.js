var util = require('./util');

module.exports = ring;

/**
 * [min, max)
 */
function ring(min, max, coerce) {

  if (typeof max === 'undefined') {
    max = min;
    min = 0;
  }

  if (typeof coerce === 'undefined') {
    coerce = util.coerce;
  }

  map.min = min = coerce(min);
  map.max = max = coerce(max);
  map.size = max.sub(min);

  function map(num) {
    num = coerce(num);

    if (num.lt(min)) {
      return max.sub(min.sub(num).mod(map.size));
    } else if (num.ge(max)) {
      return min.add(num.sub(min).mod(map.size));
    }

    return num;
  }

  map.test = function test(num) {
    return min.le(num) && max.gt(num);
  };
  map.between = function between(num, min, max) {
    num = map(num);
    min = map(min);
    max = map(max);

    if (min.lt(max)) {
      return min.le(num) && max.gt(num);
    } else {
      return min.le(num) || max.gt(num);
    }
  };

  return map;
}
