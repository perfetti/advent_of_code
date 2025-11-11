import fs from "fs";

const input = fs.readFileSync("./sample.txt", "utf8");
const lines = input.split("\n");
const reports: number[][] = [];

lines.forEach((line) => {
  reports.push(line.split(/\s+/).map((num) => parseInt(num)));
});

console.log(reports);