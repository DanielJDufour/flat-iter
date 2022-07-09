const { getOrCreateIterator, wrapNextFunction } = require("iter-fun");

// includes TypedArrays
function isArray(data) {
  return (
    typeof data === "object" &&
    typeof data.length === "number" &&
    typeof data.constructor === "function" &&
    typeof data.constructor.name === "string" &&
    data.constructor.name.includes("Array")
  );
}

function flatIter(data, depth = 1) {
  let iter = getOrCreateIterator(data);
  let ancestry = [];
  function next() {
    let { done, value } = iter.next();
    if (done) {
      if (ancestry.length === 0) {
        return { done: true };
      } else {
        iter = ancestry.pop();
        return next(); // re-run
      }
    } else if (ancestry.length < depth && isArray(value)) {
      ancestry.push(iter);
      iter = getOrCreateIterator(value);
      return next(); // re-run
    } else {
      return { done: false, value };
    }
  }

  const result = wrapNextFunction(next);

  return result;
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return flatIter;
  });
}
if (typeof module === "object") {
  module.exports = flatIter;
  module.exports.default = flatIter;
  module.exports.flatIter = flatIter;
}
if (typeof self === "object") {
  self.flatIter = flatIter;
}
if (typeof window === "object") {
  window.flatIter = flatIter;
}
