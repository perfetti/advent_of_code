const util = require("util");
var fs = require("fs");
var bigdecimal = require("bigdecimal");
const _ = require("lodash");
const Geometry = require("ts-2d-geometry");

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const finalIntersections = [];

const pointTuples = input.split("\n").map((line) =>
  line.split(" -> ").map((pos) => {
    const [x, y] = pos.split(",").map((e) => parseInt(e));
    return Geometry.Point.fromValues(x, y);
  })
);

function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

const points = [];
var dubCount = 0;

// These lines must be vertical or horizontal

pointTuples.map(([point1, point2]) => {
  const xdiff = Math.abs(point1.x - point2.x);
  const ydiff = Math.abs(point1.y - point2.y);

  if (xdiff === 0) {
    const currRange = range(ydiff, _.min([point1.y, point2.y]));
    currRange.forEach((val) => {
      points[point1.x] = points[point1.x] ? points[point1.x] : [];
      const currVal = points[point1.x][val];
      if (currVal) {
        dubCount += 1;
      } else {
        points[point1.x][val] = true;
      }
    });
  } else if (ydiff === 0) {
    const currRange = range(xdiff, _.min([point1.x, point2.x]));
    currRange.forEach((val) => {
      points[val] = points[val] ? points[val] : [];
      const currVal = points[val][point1.y];
      if (currVal) {
        dubCount += 1;
      } else {
        points[val][point1.y] = true;
      }
    });
  }
});

const groupedPoints = _.groupBy(points);

Object.keys(groupedPoints).forEach((key) => {
  if (groupedPoints[key].length > 1) {
    dubCount += 1;
  }
});

console.log("dubCount ", dubCount);
