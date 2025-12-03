import fs from "fs";

const sampleInput = fs.readFileSync("./sample.txt", "utf8");
const sampleInputLines = sampleInput.split("\n");
const input = fs.readFileSync("./input.txt", "utf8");
const inputLines = input.split("\n");
interface iReport = { levels: number[], safe: boolean, badTransitions: number, errorReason: string[] };

class Node {
  public index: number;
  public level: number;

  constructor(index: number, level: number) {
    this.index = index;
    this.level = level;
  }
}

class Transition {
  public wasRising: boolean;
  public isRising: boolean;
  public distance: number;
  public errors: string[] = [];

  constructor(public curNode: Node, public penUltimateNode: Node, public lastNode: Node) {
    this.wasRising = penUltimateNode.level < lastNode.level;
    this.isRising = lastNode.level < curNode.level;
    this.distance = Math.abs(lastNode.level - curNode.level);
  }

  isSafe(): boolean {
    if(Number.isNaN(this.lastNode.level)) return true;
    if(this.distance == 0) this.errors.push("Report is not safe, levels changing TOO LITTLE");
    if(this.distance > 3) this.errors.push("Report is not safe, levels changing TOO MUCH");
    if(this.penUltimateNode.level && this.wasRising !== this.isRising) this.errors.push("Report is not safe, levels are not consistently rising or falling");
    return this.errors.length === 0;
  }
}

class Report {
  public nodes: Node[] = [];
  public transitions: Transition[] = [];
  public isSafe: boolean = true;
  public badTransitions: number = 0;
  public errorReason: string[] = [];

  constructor(public levels: number[]) {
    this.nodes = levels.map((level, index) => new Node(index, level));
  }

  parse() {
    this.levels.forEach((level, index) => {
      const node = new Node(index, level);
      const penUltimateNode = new Node(index - 2, this.levels[index - 2]);
      const lastNode = new Node(index - 1, this.levels[index - 1]);
    });

    this.transitions.forEach((transition) => {
      if(!transition.isSafe()) {
        this.errorReason.push(...transition.errors);
      }
    });
  }
}

function parseSingleReport(line: string): iReport {
  let errorReason: string[] = [];
  const levelStrings = line.split(/\s+/)
  const levels: number[] = [];
  const transitions: Transition[] = [];
  const isSafe = true;

  levelStrings.forEach((curLevelString, index) => {
    const node = new Node(index, parseInt(curLevelString));
    const penUltimateNode = new Node(index - 2, parseInt(levelStrings[index - 2]));
    const lastNode = new Node(index - 1, parseInt(levelStrings[index - 1]));

    const transition = new Transition(node, penUltimateNode, lastNode);

    if(!transition.isSafe()) {
      errorReason.push(...transition.errors);
      // Now we see if skipping this node would make the report safe.
      const nextIndex = index + 1;
      const nextLevel = parseInt(levelStrings[nextIndex]);
      const nextNode = new Node(nextIndex, nextLevel);
      const nextTransition = new Transition(nextNode, lastNode, node);
      if(nextTransition.isSafe()) {
        isSafe = true;
        badTransitions.push(transition);
      }
    }

    levels.push(currentLevel);
    transitions.push(transition);
  });

  const badTransitions = transitions.filter((transition) => !transition.isSafe());
  // We allow 1 error per report.
  return { levels, safe: isSafe, badTransitions: badTransitions.length, errorReason };
}


function parseFullReports(lines: string[]): [Report[], number] {
  let safeReportCount = 0;

  const reports: iReport[] = lines.map((line) => {
    const report = parseSingleReport(line);

    if(report.safe) safeReportCount++;
    return report;
  });

  console.log(reports.slice(0, 5));
  console.log("Safe report count:", safeReportCount);
  return [reports, safeReportCount];
}
// console.log(parseSingleReport("1 3 6 7 9"));

parseFullReports(sampleInputLines);
// parseFullReports(inputLines);