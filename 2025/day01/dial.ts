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
  public timesWePassThrough0: number = 0;
  public position: number = 50;
  public commands: Command[] = [];

  constructor(public input: string) {
    this.position = 50;
    this.timesWeStopAt0 = 0;
    this.timesWePassThrough0 = 0;
    this.commands = input.split("\n").map(parseCommand);
  }

  execute() {
    console.log("Starting at position", this.position);
    this.commands.forEach((command, index) => {
      // console.log("Executing command", index+1, command);
      this.move(command);
    });
  }

  move = ({direction, amount}: Command) => {
    const startingPosition = this.position;
    const directionIsRight = direction === Direction.Right;
    const moveFunc = directionIsRight ? this.tickRight : this.tickLeft;

    let curPos;
    for(var i=0;i<amount;i++){
      curPos = moveFunc()
      if(curPos == 0){
        console.log("Hit 0")
        this.timesWePassThrough0++
      }
    }
    console.log(
      "Moved", directionIsRight ? "right" : "left", `${amount} Ticks`,
      'from', startingPosition, 'to', curPos
    )
  }

  tickLeft = () => {
    const lastPos = this.position;
    let newPos = this.position-1

    if(newPos < 0) {
      this.position = 99
    } else {
      this.position = newPos;
    }

    console.log('moving from ', this.position, 'to', newPos)
    return this.position;
  }

  tickRight = () => {
    if(this.position === 99) {
      this.position = 0
    } else {
      this.position++
    }
    return this.position;
  }
}

const input = fs.readFileSync("./input.txt", "utf8");
const safe = new Safe(input);
safe.execute();
console.log("Final position:", safe.position);
console.log("Times we stopped at 0:", safe.timesWeStopAt0);
console.log("Times we passed through 0:", safe.timesWePassThrough0);