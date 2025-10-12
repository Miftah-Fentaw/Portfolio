"use strict";

var fs = require("fs");

var upath = require("upath");

var pug = require("pug");

var sh = require("shelljs");

var prettier = require("prettier");

module.exports = function renderPug(filePath) {
  var destPath = filePath.replace(/src\/pug\//, "dist/").replace(/\.pug$/, ".html");
  var srcPath = upath.resolve(upath.dirname(__filename), "../src");
  console.log("### INFO: Rendering ".concat(filePath, " to ").concat(destPath));
  var html = pug.renderFile(filePath, {
    doctype: "html",
    filename: filePath,
    basedir: srcPath
  });
  var destPathDirname = upath.dirname(destPath);

  if (!sh.test("-e", destPathDirname)) {
    sh.mkdir("-p", destPathDirname);
  }

  var prettified = prettier.format(html, {
    printWidth: 1000,
    tabWidth: 4,
    singleQuote: true,
    proseWrap: "preserve",
    endOfLine: "lf",
    parser: "html",
    htmlWhitespaceSensitivity: "ignore"
  });
  fs.writeFileSync(destPath, prettified);
};