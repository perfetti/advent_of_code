import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8");
const lines = input.split("\n");
const leftList: number[] = [];
const rightList: number[] = [];
const rightFrequencySet: Record<number, number> = {};

// PrepData
// Parse the input into two lists.
lines.forEach((line) => {
  const [left, right] = line.split(/\s+/).map((num) => parseInt(num));
  leftList.push(left);
  rightList.push(right);
  rightFrequencySet[right] = (rightFrequencySet[right] || 0) + 1;
});

leftList.sort()
rightList.sort()


// Calculate things
let totalDistance = 0;
let similarityScore = 0;

for (let i = 0; i < leftList.length; i++) {
  totalDistance += Math.abs(leftList[i] - rightList[i]);
  similarityScore += leftList[i] * rightFrequencySet[leftList[i]] || 0;
}

console.log("totalDistance", totalDistance);
console.log("similarityScore", similarityScore);