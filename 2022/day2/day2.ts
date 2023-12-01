const fs = require("fs");
type Option = "🪨" | "📄" | "✂️";
enum OPTION {
  ROCK = "🪨",
  PAPER = "📄",
  SCISSORS = "✂️",
}

type CodedOptions = "A" | "B" | "C" | "X" | "Y" | "Z";
enum CODED_OPTION  {
  A = "A",
  B = "B",
  C = "C",
  X = "X",
  Y = "Y",
  Z = "Z",
}

const decoderMap: Record<CodedOptions, Option>  = {
  [CODED_OPTION.A]: OPTION.ROCK,
  [CODED_OPTION.B]: OPTION.PAPER,
  [CODED_OPTION.C]: OPTION.SCISSORS,
  [CODED_OPTION.X]: OPTION.ROCK,
  [CODED_OPTION.Y]: OPTION.PAPER,
  [CODED_OPTION.Z]: OPTION.SCISSORS,
}

type Outcome = "win" | "lose" | "draw";

const WhoBeatsWho: Record<Option, Option> = {
  [OPTION.ROCK]: OPTION.SCISSORS,
  [OPTION.SCISSORS]: OPTION.PAPER,
  [OPTION.PAPER]: OPTION.ROCK,
}
const scoringMap: Record< OPTION | Outcome, number> = {
  lose: 0,
  draw: 3,
  win: 6,

  [OPTION.ROCK]: 1,
  [OPTION.PAPER]: 2,
  [OPTION.SCISSORS]: 3
};
// Helper funcs
const roundScore = ({myThrow, outcome}: {myThrow: Option, outcome: Outcome}): number => scoringMap[myThrow] + scoringMap[outcome];
const getRound = (round: string) => round.split(" ") as [CodedOptions, CodedOptions];
const roundOutcome = (myThrow: Option, opsThrow: Option): Outcome => myThrow === opsThrow ? "draw" : myThrow === WhoBeatsWho[opsThrow] ? "win" : "lose";


// Lets get started
const input = fs.readFileSync("input", "utf8").split("\r");
let score = 0;

// iterate over the rounds
const rounds: [[Outcome, number]] = input.map((round: string) => {
  const [opsThrow, myThrow] = getRound(round);

  const outcome = roundOutcome(decoderMap[myThrow], decoderMap[opsThrow]);

  score += roundScore({myThrow: decoderMap[myThrow], outcome})
  return [outcome, score];
})

console.log(rounds);