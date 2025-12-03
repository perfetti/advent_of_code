import fs from 'fs';

// Lets' the debugging work.
const INPUT_FILE = __dirname + "/input.txt"

const bad_values: number[] = [];

const comma_separated_values = fs.readFileSync(INPUT_FILE, "utf8").split(",");

console.log(comma_separated_values)

const is0Initial = (value: string): boolean => {
  return value.startsWith("0");
}

const build_range_array = (from: number, to: number): number[] => {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

// Each entry is maybe a range
comma_separated_values.forEach((raw_range: string) => {
  if(is0Initial(raw_range)) return;

  const [from, to] = raw_range.split("-").map(Number);
  console.log("processing range", raw_range);
  const range = build_range_array(from, to);

  // Check everything from the range
  range.forEach((value) => {
    const stringVal = value.toString()
    const isRepeated = /^(.+)\1+$/g.test(stringVal);
    // If it is repeating pattern it is invalid and we throw it into bad values
    if(isRepeated) {
      console.log("Bad number detected", value)
      bad_values.push(value);
    }
  })
})


const totalOfAllNumbers = bad_values.reduce((acc, curVal)=> acc + curVal, 0)
console.log("Bad numbers summed together", totalOfAllNumbers)