import fs from "fs";

const input = fs.readFileSync("./sample.txt", "utf8");
const lines = input.split("\n");
type Report = { levels: number[], safe: boolean };
const reports: Report[] = [];
let safeReportCount = 0;

lines.forEach((line) => {
  let isSafe = true;
  let isRising: boolean | null = null;
  const levelStrings = line.split(/\s+/)

  const levels = levelStrings.map((num, index) => {
    let lastLevel = parseInt(levelStrings[index - 1])
    const currentLevel = parseInt(num);

    try {
      if(lastLevel !== null) {
        const delta = lastLevel - currentLevel
        const distance = Math.abs(delta);
        const rose = delta >= 0;

        if(distance < 1 || distance > 3) throw new Error("Report is not safe, levels changing WILDLY");
        if(isRising !== null && isRising !== rose) throw new Error("Report is not safe, levels are not consistently rising or falling");
      }
    } catch (error) {
      isSafe = false;
    }

    lastLevel = currentLevel
    return currentLevel
  });

  if(isSafe) safeReportCount++;
  reports.push({ levels, safe: isSafe });
});

console.log(reports);
console.log("Safe report count:", safeReportCount);