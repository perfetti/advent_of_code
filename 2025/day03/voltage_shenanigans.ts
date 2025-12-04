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

function find12DigitBatteryVoltage(battery: string, log=false) {
  console.log("Working on ", battery)
  let digits: IndexedValue[] = battery.split('').map((value, index) => ({value: Number(value), index}) as IndexedValue)

  // We want to find the largest EARLIEST digit.
  const firstDigits = digits.slice(0, battery.length - 12);
  const earliestDigit = findHighestEarlierValue(firstDigits);

  const matchingValuesInFirstDigits = firstDigits.filter(d => d.value === earliestDigit.value);

  if(matchingValuesInFirstDigits.length > 1) {
    console.log('multiple matching values in first digits', matchingValuesInFirstDigits);
  }

  const voltages = matchingValuesInFirstDigits.map(d => generateVoltageFromEarliestDigit(d, [...digits.map((d) => ({value: d.value, index: d.index}))], log));
  console.log(voltages);
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

const batteries = fs.readFileSync(INPUT_FILE, "utf8").split("\n").filter(l => l.trim());

let voltageCount = 0;
let voltageCountPartTwo = 0;
let mismatches = 0;

batteries.forEach((battery: string, battery_index: number) => {
  const delta = findCorrectVoltage(battery);
  const new12DigitDelta = find12DigitBatteryVoltage(battery);

  const oldVoltage = voltageCount
  const oldVoltagePartTwo = voltageCountPartTwo;
  voltageCount += delta;
  voltageCountPartTwo += new12DigitDelta;

  console.log(`Index${battery_index+1}`, 'oldVoltage', oldVoltage, 'delta', delta, 'voltageCount', voltageCount);
  console.log(`Index${battery_index+1}`, 'oldVoltagePartTwo', oldVoltagePartTwo, 'delta', new12DigitDelta, 'voltageCountPartTwo', voltageCountPartTwo);
});

console.log("Total voltage count:", voltageCount);
console.log("Total voltage count part two:", voltageCountPartTwo);


// ["987654321111111",
// "811111111111119",
// "234234234234278",
// "818181911112111"].forEach((val) => {
//   console.log(val, find12DigitBatteryVoltage(val))
// })