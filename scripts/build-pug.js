"use strict";
const upath = require("upath");
const renderPug = require("./render-pug");
const fs = require("fs");

function getPugFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        const filePath = upath.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            // Skip 'includes' and any directory starting with '_'
            if (file === "includes" || file.startsWith("_")) return;
            results = results.concat(getPugFiles(filePath));
        } else if (
            file.endsWith(".pug") &&
            !file.startsWith("_") &&
            !filePath.includes("/includes/")
        ) {
            results.push(filePath);
        }
    });
    return results;
}

const pugDir = upath.resolve(upath.dirname(__filename), "../src/pug");
const files = getPugFiles(pugDir);

Promise.all(files.map(file => renderPug(file))).catch(err => {
    console.error(err);
    process.exit(1);
});