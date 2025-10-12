"use strict";

var upath = require("upath");

var renderPug = require("./render-pug");

var fs = require("fs");

function getPugFiles(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    var filePath = upath.join(dir, file);
    var stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      // Skip 'includes' and any directory starting with '_'
      if (file === "includes" || file.startsWith("_")) return;
      results = results.concat(getPugFiles(filePath));
    } else if (file.endsWith(".pug") && !file.startsWith("_") && !filePath.includes("/includes/")) {
      results.push(filePath);
    }
  });
  return results;
}

var pugDir = upath.resolve(upath.dirname(__filename), "../src/pug");
var files = getPugFiles(pugDir);
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var file = _step.value;
    renderPug(file);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}