import fs from 'fs';


enum Direction {
  Left = "L",
  Right = "R",
}
type Command = {
  direction: Direction;
  amount: number;
}
function parseCommand(command: string): Command {
  const [direction, ...remainder] = command

  return {
    direction: direction as Direction,
    amount: parseInt(remainder.join("")),
  }
}

class Safe {
  public dialSize:  number = 100
  public timesWeStopAt0: number = 0;
  public position: number = 50;
  public commands: Command[] = [];

  constructor(public input: string) {
    this.position = 50;
    this.timesWeStopAt0 = 0;
    this.commands = input.split("\n").map(parseCommand);
  }

  execute() {
    this.commands.forEach((command, index) => {
      // console.log("Executing command", index+1, command);
      this.move(command);
    });
  }

  move({direction, amount}: Command) {
    if(direction === Direction.Right) {
      this.turnRight(amount % this.dialSize);
    } else if (direction === Direction.Left) {
      this.turnLeft(amount % this.dialSize);
    } else {
      throw new Error(`Invalid direction: ${direction}`);
    }

    if(this.position === 0) { this.timesWeStopAt0++; }
  }

  turnLeft(delta: number) {
    const lastPosition = this.position;
    const nextPosition = (this.position - delta);

    if(nextPosition < 0) {
      this.position = this.dialSize + nextPosition;
    } else {
      this.position = nextPosition;
    }

    console.log("Turning left by", delta, "from", lastPosition, "to", this.position);
  }

  turnRight(delta: number) {
    const lastPosition = this.position;
    const nextPosition = this.position + delta;

    this.position = (this.position + delta) % this.dialSize;

    console.log("Turning right by", delta, "from", lastPosition, "to", this.position);
  }
}

const input = fs.readFileSync("./demo_input.txt", "utf8");
const safe = new Safe(input);
safe.execute();
console.log("Final position:", safe.position);
console.log("Times we stopped at 0:", safe.timesWeStopAt0);