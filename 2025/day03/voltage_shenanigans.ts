import fs from 'fs';

// Lets' the debugging work.
const INPUT_FILE = __dirname + "/input.txt"

// This brute force does not work for 12 digits because we'd do 16! permutations per row
// We'll retry the old way for part 2
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

const sortDigitsHighToLowValueIndex = (a: IndexedValue, b: IndexedValue) => {
  if(a.value !== b.value) return a.value > b.value ? -1 : 1
  if(a.index === b.index) return 0;
  return a.index > b.index ? -1 : 1;
}

function findHighestEarlierValue(digits: IndexedValue[]): IndexedValue {
  return digits.reduce((acc, cur) => {
    const isEqualButEarlier = (cur.value == acc.value && cur.index < acc.index)
    const isHigher = (cur.value > acc.value)
    if(isHigher || isEqualButEarlier) return cur;
    return acc;
  }, digits[0]);
}

type IndexedValue = {
  value: number;
  index: number;
}

export function find12DigitBatteryVoltage(battery: string, log=false) {
  if (log) console.log("Working on ", battery)
  let digits: IndexedValue[] = battery.split('').map((value, index) => ({value: Number(value), index}) as IndexedValue)

  // We want to find the largest EARLIEST digit.
  const firstDigits = digits.slice(0, battery.length - 12);
  const earliestDigit = findHighestEarlierValue(firstDigits);

  const matchingValuesInFirstDigits = firstDigits.filter(d => d.value === earliestDigit.value);

  if(log && matchingValuesInFirstDigits.length > 1) {
    console.log('multiple matching values in first digits', matchingValuesInFirstDigits);
  }

  const voltages = matchingValuesInFirstDigits.map(d => generateVoltageFromEarliestDigit(d, digits.map((d) => ({value: d.value, index: d.index})), log));
  if (log) console.log(voltages);
  return Math.max(...voltages);
}

function generateVoltageFromEarliestDigit(earliestDigit: IndexedValue, digits: IndexedValue[], log:boolean=false) {
  log && console.log('earliestDigit', earliestDigit);
  // printDigits(digits);
  for(let i=0; i<earliestDigit.index; i++){
    const removed = digits.shift();
    log && console.log('removing from front', removed);
  }


  // printDigits(digits);
  digits = digits.sort(sortDigitsHighToLowValueIndex);
  // console.log('digits', digits);
  while(digits.length > 12) {
    const removed = digits.pop()
    log && console.log('removing', removed);
  }

  digits = digits.sort((a,b) => a.index - b.index);
  const digitsWithoutTheChaff = Number(digits.map(d => d.value).join(""));
  log && console.log('digitsWithoutTheChaff', digitsWithoutTheChaff);

  return digitsWithoutTheChaff;
}



function printDigits(digits: IndexedValue[]) {
  console.log(digits.map(d => d.value).join(""));
}

/**
 * Brute force / optimal solution using Dynamic Programming
 * Finds the maximum 12-digit number by selecting exactly 12 digits
 * while maintaining their original order.
 *
 * Uses DP: dp[i][j] = max number using first i digits, selecting exactly j digits
 */
export function findOptimal12DigitVoltage(battery: string): number {
  const digits = battery.split('').map(Number);
  const n = digits.length;
  const k = 12;

  // dp[i][j] = maximum number (as BigInt) using first i digits, selecting exactly j digits
  // Use BigInt to handle large numbers
  const dp: (bigint | null)[][] = Array(n + 1).fill(null).map(() => Array(k + 1).fill(null));

  // Base case: using 0 digits, selecting 0 digits = 0
  dp[0][0] = 0n;

  // Base case: using any prefix, selecting 0 digits = 0
  for (let i = 1; i <= n; i++) {
    dp[i][0] = 0n;
  }

  // Base case: using 0 digits, selecting j > 0 digits = impossible (null)
  for (let j = 1; j <= k; j++) {
    dp[0][j] = null;
  }

  // Fill DP table
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= k; j++) {
      const digit = BigInt(digits[i - 1]);

      // Option 1: Don't take digit at position i-1
      const skip = dp[i - 1][j];

      // Option 2: Take digit at position i-1
      const take = dp[i - 1][j - 1];
      const takeValue = take !== null ? take * 10n + digit : null;

      // Choose maximum
      if (skip === null && takeValue === null) {
        dp[i][j] = null;
      } else if (skip === null) {
        dp[i][j] = takeValue;
      } else if (takeValue === null) {
        dp[i][j] = skip;
      } else {
        dp[i][j] = skip > takeValue ? skip : takeValue;
      }
    }
  }

  const result = dp[n][k];
  if (result === null) {
    throw new Error(`Cannot form 12-digit number from battery of length ${n}`);
  }

  return Number(result);
}

const batteries = fs.readFileSync(INPUT_FILE, "utf8").split("\n").filter(l => l.trim());

let voltageCount = 0;
let voltageCountPartTwo = 0;
let mismatches = 0;

batteries.forEach((battery: string, battery_index: number) => {
  const delta = findCorrectVoltage(battery);
  const optimal12Digit = findOptimal12DigitVoltage(battery);
  const my12Digit = find12DigitBatteryVoltage(battery);

  if (optimal12Digit !== my12Digit) {
    mismatches++;
    console.log(`\n✗ MISMATCH at Index${battery_index+1}:`);
    console.log(`  Your solution: ${my12Digit}`);
    console.log(`  Optimal solution: ${optimal12Digit}`);
    console.log(`  Battery: ${battery.substring(0, 80)}...`);
  }

  const oldVoltage = voltageCount
  const oldVoltagePartTwo = voltageCountPartTwo;
  voltageCount += delta;
  voltageCountPartTwo += optimal12Digit;

  if (battery_index < 5 || optimal12Digit !== my12Digit) {
    console.log(`Index${battery_index+1}`, 'oldVoltage', oldVoltage, 'delta', delta, 'voltageCount', voltageCount);
    console.log(`Index${battery_index+1}`, 'oldVoltagePartTwo', oldVoltagePartTwo, 'delta', optimal12Digit, 'voltageCountPartTwo', voltageCountPartTwo);
  }
});

console.log("\n=== SUMMARY ===");
console.log(`Total mismatches: ${mismatches} out of ${batteries.length}`);
console.log("Total voltage count:", voltageCount);
console.log("Total voltage count part two:", voltageCountPartTwo);


// ["987654321111111",
// "811111111111119",
// "234234234234278",
// "818181911112111"].forEach((val) => {
//   console.log(val, find12DigitBatteryVoltage(val))
// })