const fs = require("fs");
const CliGraph = require("cli-graph");

const points = JSON.parse(fs.readFileSync(__dirname + "/finalPoints.json"));
console.log(points);
const maxX = Math.max(...points.map(([x, y]) => x));
const maxY = Math.max(...points.map(([x, y]) => y));
const graph = new CliGraph({ height: maxY * 2.5, width: maxX * 2.5 });
points.forEach(([x, y]) => {
  graph.addPoint(x, y);
});
console.log(graph.toString());
