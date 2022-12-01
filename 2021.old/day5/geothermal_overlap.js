const util = require("util");
var fs = require("fs");
var bigdecimal = require("bigdecimal");
const _ = require("lodash");
const Geometry = require("ts-2d-geometry");

const input = fs.readFileSync(__dirname + "/input.txt").toString();

const pointTuple = input.split("\n").map((line) =>
  line.split(" -> ").map((pos) => {
    const [x, y] = pos.split(",").map((e) => parseInt(e));
    return Geometry.Point.fromValues(x, y);
  })
);

const lines = pointTuple.map(([point1, point2]) => {
  return new Geometry.LineSegment(point1, point2);
});

const finalIntersections = [];

const roundNumber = (number) => {
  const decimal = number % 1;
  if (decimal === 0.5) {
    return number;
  } else if (decimal < 0.5) {
    return Math.floor(number);
  } else {
    return Math.ceil(number);
  }
};

lines.forEach((line, index) => {
  const checkLines = [...lines].splice(1, index);
  checkLines.forEach((checkLine) => {
    const intersection = line.intersect(checkLine);
    if (intersection.nonEmpty()) {
      var { x, y } = intersection.value;
      finalIntersections.push([
        new bigdecimal.BigDecimal(x),
        new bigdecimal.BigDecimal(y),
      ]);

      //   finalIntersections.push([roundNumber(x), roundNumber(y)]);
    }
  });
});

const uniqIntersections = _.uniqWith(finalIntersections, _.isEqual);
const sortedIntersections = _.sortBy(uniqIntersections, (arr) => arr);

console.log(
  util.inspect(sortedIntersections, {
    showHidden: false,
    maxArrayLength: null,
    colors: true,
  })
);
console.log("number of intersections", sortedIntersections.length);
