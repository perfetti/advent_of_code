import { InputKey, InputLock } from "../types";
import { InputParser } from "../input_parser";
import expectedResult from "./expected_result.json" assert { type: "json" };
import fs from "fs";

const inputParser = new InputParser("./sample_input.txt");
const parsedInput = inputParser.parse();
const { keys, locks } = parsedInput;

const expectedKeys = expectedResult.keys;
const expectedLocks = expectedResult.locks;

function matches(message: string, obj1: Array<any>, obj2: Array<any>) {
  obj1 = obj1.sort();
  obj2 = obj2.sort();
  console.log(message, JSON.stringify(obj1) === JSON.stringify(obj2));
  console.log(obj1.sort())
  console.log(obj2.sort())
}

matches("keys are as expected", keys, expectedKeys);
matches("locks are as expected", locks, expectedLocks);
