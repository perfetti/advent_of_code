import fs from 'fs';

// Lets' the debugging work.
const INPUT_FILE = __dirname + "/input.txt"

const batteries = fs.readFileSync(INPUT_FILE, "utf8").split("\n");

let voltageCount = 0;

batteries.forEach((battery: string, battery_index: number) => {
  let highFirst: number;
  let highSecond: number;

  const [first, second, ...rest] = battery.split('');
  highFirst = parseInt(first);
  highSecond = parseInt(second);

  const ints = rest.map((i) => parseInt(i));
  ints.forEach((value: number, index: number) => {
    if(value > highFirst && index !== ints.length - 1) {
      highFirst = value;
      highSecond = ints[index + 1];
    } else if (value > highSecond) {
      highSecond = value;
    }

  })

  const delta = highFirst*10 + highSecond;
  const oldVoltage = voltageCount
  voltageCount += delta;

  console.log(`Index${battery_index+1}`, 'oldVoltage', oldVoltage, 'delta', delta, 'voltageCount', voltageCount);
});

console.log("Total voltage count:", voltageCount);