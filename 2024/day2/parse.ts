import fs from "fs";

const sampleInput = fs.readFileSync("./sample.txt", "utf8");
const sampleInputLines = sampleInput.split("\n");
const input = fs.readFileSync("./input.txt", "utf8");
const inputLines = input.split("\n");
type Report = { levels: number[], safe: boolean, errorReason: string };



function parseSingleReport(line: string): Report {
  let isSafe = true;
    let errorReason = "";
    const levelStrings = line.split(/\s+/)

    const levels = levelStrings.map((curLevelString, index) => {
    const currentLevel = parseInt(curLevelString);
    const penUltimateLevel = parseInt(levelStrings[index - 2]);
    const lastLevel = parseInt(levelStrings[index - 1]);

      try {
        if(lastLevel) {
          const distance = Math.abs(lastLevel - currentLevel);
          const wasRising = penUltimateLevel < lastLevel;
          const isRising = lastLevel < currentLevel;

          // console.log(penUltimateLevel, lastLevel, currentLevel, 'wasRising', wasRising, 'isRising', isRising);

          if(distance == 0) throw new Error("Report is not safe, levels changing TOO LITTLE");
          if(distance > 3) throw new Error("Report is not safe, levels changing TOO MUCH");
          if(penUltimateLevel && wasRising !== isRising) throw new Error("Report is not safe, levels are not consistently rising or falling");
        }
      } catch (error) {
        isSafe = false;
        errorReason = error.message;
      }

      return currentLevel
    });

  return { levels, safe: isSafe, errorReason };
}

function parseFullReports(lines: string[]): [Report[], number] {
  const reports: Report[] = [];
  let safeReportCount = 0;

  lines.forEach((line) => {
    const { levels, safe, errorReason } = parseSingleReport(line);

    if(safe) safeReportCount++;
    reports.push({ levels, safe, errorReason });
  });

  console.log(reports.slice(0, 5));
  console.log("Safe report count:", safeReportCount);
  return [reports, safeReportCount];
}
// console.log(parseSingleReport("1 3 6 7 9"));

// parseFullReports(sampleInputLines);
parseFullReports(inputLines);