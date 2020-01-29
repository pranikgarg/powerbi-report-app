"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = void 0;

// Removes null, undefined and empty string from given object
var clean = function clean(obj) {
  var propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach(function (element) {
    if (obj[element] === null || obj[element] === undefined || obj[element] === '') {
      delete obj[element];
    }
  });
  return obj;
};

exports.clean = clean;