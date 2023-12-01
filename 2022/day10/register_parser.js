const fs = require("fs");

const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .split("\r")
  .map((str) => str.split(" "));

console.log(input)

const register = 1;
const cycle = 1;
// {[number]: {register: number, cycle: number}
const states = []

const isNoop = (instruction) => instruction[0] === "noop";
const stepCycle = () => {
  states.push({register, cycle});
  cycle += 1;
};

const addx = (addAmount) => {
  console.log("addx");
  states.push({register, cycle});
  register += addAmount;
  states.push({register, cycle});
  cycle += 1;
}

input.forEach((instruction, index) => {
  console.log("Start cycle", cycle)
  isNoop(instruction) ? stepCycle() : console.log("not noop");
  console.log("end cycle", cycle)
});

