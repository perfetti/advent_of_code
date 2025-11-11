import { InputParser } from "./input_parser";

const inputParser = new InputParser("./input.txt");
const parsedInput = inputParser.parse();
const { keys, locks } = parsedInput;

console.log("we got this many fits", inputParser.countFits());