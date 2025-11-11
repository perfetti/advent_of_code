import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8");
const lines = input.split("\n");
const leftList: number[] = [];
const rightList: number[] = [];

// Parse the input into two lists.
lines.forEach((line) => {
  const [left, right] = line.split(/\s+/);
  leftList.push(parseInt(left));
  rightList.push(parseInt(right));
});

leftList.sort()
rightList.sort()

let totalDistance = 0;
for (let i = 0; i < leftList.length; i++) {
  totalDistance += Math.abs(leftList[i] - rightList[i]);
}

console.log("totalDistance", totalDistance);