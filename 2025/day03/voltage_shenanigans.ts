import fs from 'fs';

// Lets' the debugging work.
const INPUT_FILE = __dirname + "/input.txt"

function findCorrectVoltage(battery: string): number {
  const digits = battery.split('').map(Number);
  let maxVal = 0;
  for (let i = 0; i < digits.length; i++) {
    for (let j = i + 1; j < digits.length; j++) {
      const val = digits[i] * 10 + digits[j];
      if (val > maxVal) maxVal = val;
    }
  }
  return maxVal;
}

const batteries = fs.readFileSync(INPUT_FILE, "utf8").split("\n").filter(l => l.trim());

let voltageCount = 0;
let mismatches = 0;

batteries.forEach((battery: string, battery_index: number) => {
  const delta = findCorrectVoltage(battery);

  const oldVoltage = voltageCount
  voltageCount += delta;

  console.log(`Index${battery_index+1}`, 'oldVoltage', oldVoltage, 'delta', delta, 'voltageCount', voltageCount);
});

console.log("Total voltage count:", voltageCount);