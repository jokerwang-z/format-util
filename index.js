
// (function (global, factory) {
//   // CommonJS, CMD
//   if (typeof exports === 'object' && typeof module === 'object') {
//     module.exports = factory();
//   } else if (typeof define === 'function' && define.amd) {
//     define([], factory);
//   } else {
//     global.__format__ = factory()
//   }
// })(window, function () {
//   'use strict';

/**
* 小数格式化
* @param number {string | number} 金额
* @param decimal {number?} 保留小数位数
* @param type {number?} 小数规则 round, ceil, floor
*/
export function formatDecimal(number, decimal, type) {
  number = number + '';
  const arr = number.split('.');
  let temp_d = '';
  let result = arr[0];

  if (type === 'round') {
    type = 0;
  } else if (type === 'ceil') {
    type = 1;
  } else if (type === 'floor') {
    type = 2;
  }

  if (arr.length > 1) {
    temp_d = arr[1];
  }

  if (decimal) {
    if (decimal < 0) {
      throw new Error('decimal must be greater than or equal to 0');
    }
    if (temp_d.length) {

      if (decimal > temp_d.length) {
        result = number + getDecimal(decimal - temp_d.length, false);
      } else if (decimal < temp_d.length) {
        let _str = result + '.' + temp_d.substring(0, decimal);
        // 进1
        if (type === 0 && +temp_d[decimal] > 4 || type === 1) {
          const m = Math.pow(10, decimal);
          _str = ((+_str * m + 1) / m) + '';

          const index = _str.indexOf('.');
          if (index === -1) {
            _str += getDecimal(decimal, true)
          } else {
            _str += getDecimal(decimal - (_str.length - index - 1), false);
          }
          result = _str;
        } else {
          result = _str;
        }
      } else {
        result = number;
      }
    } else {
      result += getDecimal(decimal, true);
    }
  }

  function getDecimal(len, dot) {
    let t = '';
    if (dot) {
      t += '.';
    }
    for (let i = 0; i < len; i++) {
      t += '0';
    }
    return t;
  }

  return result;
}

/**
 * 数字格式化 （如：金额 10,000,000.00 | 手机号 183 0000 0000 | 银行卡 6217 0038 1004 8135 381）
 * @param str {string|number}
 * @param options {type: ',', splitLength: 3, leftToRight: false}
 */
export function formatNumber(str, options) {
  str += '';
  options = options || {};
  const splitLength = options.splitLength || 3;
  const leftToRight = options.leftToRight || false;
  const type = options.type || ',';


  const arr = str.split('.');
  const start = arr[0];
  let t = '';
  if (leftToRight) {
    for (let i = 0; i < start.length; i += splitLength) {
      t += start.substring(i, i + splitLength);
      if (i + splitLength < start.length) {
        t += type;
      }
    }
  } else {
    for (let i = start.length; i > 0; i -= splitLength) {
      if (t) {
        t = start.substring(i - splitLength, i) + type + t;
      } else {
        t = start.substring(i - splitLength, i);
      }
    }
  }

  if (arr.length > 1) {
    t += '.' + arr[1];
  }
  return t;
}

//   return {
//     formatDecimal: formatDecimal,
//     formatNumber: formatNumber
//   };
// })