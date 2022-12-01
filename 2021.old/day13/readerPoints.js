"use strict";
exports.__esModule = true;
var fs = require("fs");
console.log('what');
var points = fs.readFileSync(__dirname + 'elfin_instructions.txt').toString().split('\n');
console.log(points);
points.forEach(function (point, index) {
    console.log(index, point);
});
