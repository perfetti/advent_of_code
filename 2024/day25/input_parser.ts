import { InputKey, InputLock } from "./types";
import fs from "fs";

export class InputParser {
  private filePath: string;
  keys: InputKey[] = [];
  locks: InputLock[] = [];

  constructor(private inputFilePath: string) {
    this.filePath = inputFilePath;
  }

  parse(): { keys: InputKey[], locks: InputLock[] } {
    const input = fs.readFileSync(this.filePath, "utf8");
    const keys: InputKey[] = [];
    const locks: InputLock[] = [];

    const chunks = input.split("\n\n");
    chunks.forEach((chunk) => {
      const isKey = chunk[0] !== "#";
      const collection = isKey ? keys : locks;
      collection.push(this.convertChunkToInputKeyOrLock(chunk));
    });

    this.keys = keys.sort();
    this.locks = locks.sort();
    return { keys, locks };
  }

  private convertChunkToInputKeyOrLock(chunk: string): InputKey | InputLock {
    const lines = chunk.split("\n")
    const numberOfCols = lines[0]?.length ?? 0;
    const result: InputKey = [];

    for (let colIdx = 0; colIdx < numberOfCols; colIdx++) {
      let hashCount = 0;
      lines.forEach((line) => {
        if (line[colIdx] === "#") hashCount++;
      });
      // We subtract 1 because either the top row or bottom row
      // are filled to indicate whether it is a lock or a key respectively.
      result.push(hashCount - 1);
    }

    return result;
  }
}
