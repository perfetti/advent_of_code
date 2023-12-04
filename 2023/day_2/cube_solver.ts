type ColorsAndLimits = {
  [key: string]: number
} & Object

type CubeState = {
  totalNumberOfCubes: number,
  colorsAndLimits: ColorsAndLimits
}


type Round = {
  // Example Game line:
  rawString: string,
  totalNumberOfCubes: number,
  colorsAndLimits: ColorsAndLimits,
}

const sampleGameString = 'Game 61: 7 blue, 5 green, 8 red; 12 blue, 1 red, 11 green; 15 blue, 14 red, 15 green; 14 red, 7 blue, 6 green; 9 blue; 3 green, 10 blue, 11 red'

class CubeSolver {
  public cubeState: CubeState = {
    totalNumberOfCubes: 0,
    colorsAndLimits: {}
  }

  constructor(colorsAndLimits: ColorsAndLimits) {
    // Count total number of cubes
    const totalNumberOfCubes = Object.values(colorsAndLimits).reduce((acc, limit) => acc + limit, 0);
    this.cubeState = {
      totalNumberOfCubes,
      colorsAndLimits
    }
  }

  checkRoundAgainstState(round: Round) {
    let roundValid = true;

    if (round.totalNumberOfCubes > this.cubeState.totalNumberOfCubes) {
      console.error(`Game ${round.rawString} has ${round.totalNumberOfCubes} cubes, but the total number of cubes is ${this.cubeState.totalNumberOfCubes}`)
      roundValid = false
    }

    const gameColors = Object.keys(round.colorsAndLimits);
    const stateColors = Object.keys(this.cubeState.colorsAndLimits);
    const allGameColorsValid = gameColors.filter((color) => stateColors.includes(color)).length !== gameColors.length

    gameColors.forEach((color) => {
      if (!this.cubeState.colorsAndLimits[color]) {
        console.error(`Game ${round.rawString} has color ${color}, but the state does not`)
        roundValid = false;
      }
      if(round.colorsAndLimits[color] > this.cubeState.colorsAndLimits[color]) {
        console.error(`Game ${round.rawString} has ${round.colorsAndLimits[color]} cubes of color ${color}, but the state only has ${this.cubeState.colorsAndLimits[color]}`)
        roundValid = false;
      }
    })

    return roundValid;
  }
}

class GameParser {
  rounds: Round[] = [];
  gameNumber: number = -1;

  constructor(gameString: string) {
    const [gameNumber, rounds] = this.parse(gameString);
    this.gameNumber = gameNumber;
    this.rounds = rounds;
  }

  parse(gameString: string): [number, Round[]] {
    console.log("PARSING THIS STRING", gameString);

    'Game 61: 7 blue, 5 green, 8 red; 12 blue, 1 red, 11 green; 15 blue, 14 red, 15 green; 14 red, 7 blue, 6 green; 9 blue; 3 green, 10 blue, 11 red'
    const gameRegex = /Game (\d+): (.*)/g;
    const gameMatches = gameRegex.exec(gameString);

    if (!gameMatches) throw new Error(`Could not parse game string: ${gameString}`)

    const [_, gameNumber, gameDraws] = gameMatches;

    const rounds = gameDraws.split(';').map((round) => {
      // console.log('round', round)
      let roundState: Round = {
        rawString: round,
        totalNumberOfCubes: 0,
        colorsAndLimits: {}
      };
      const numberAndColorEntries = round.split(',').map((entry) => entry.trim()).map(this.parseNumberColorEntry);

      const roundCounts = numberAndColorEntries.reduce((acc, { color, limit }) => {
        acc.colorsAndLimits[color] = limit;
        acc.totalNumberOfCubes += limit;
        return acc;
      }, {
        totalNumberOfCubes: 0,
        colorsAndLimits: {}
      } as Round)

      return {
        ...roundCounts,
        rawString: round
      };
    })

    return [Number(gameNumber), rounds];
  }

  // Takes a string like '7 blue' and returns { color: 'blue', limit: 7 }
  parseNumberColorEntry(entry: string): { color: string, limit: number } {
      const match = entry.match(/(\d+) (\w+)/)

      if (!match) {
        throw new Error(`Could not parse entry: ${entry}`)
      }

      const color = match[2];
      const limit = Number(match[1]);

      return {
        color,
        limit
      }
  }
}



const sampleGamesString = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
const initialGameState = {
  'red': 12,
  'green': 13,
  'blue': 14,
}
const cs = new CubeSolver(initialGameState);
// const gp = new GameParser(sampleGameString);

let letUsSumTheGameNumbersWhereTheGameIsValid = 0;
// Read in input.txt to gamesString
const fs = require('fs');
const gamesString = fs.readFileSync('input.txt', 'utf8') as string;

// Split the gamestring, and check them one by one for validity
gamesString.split('\n').forEach((gameString) => {
  const gp = new GameParser(gameString);
  gp.gameNumber;
  let gameValid = true;
  gp.rounds.forEach((round) => {
    const isGameValid = cs.checkRoundAgainstState(round);
    if (!isGameValid) {
      gameValid = false;
    }
    console.log('isGameValid', isGameValid)
  })
  console.log(`Game ${gp.gameNumber} is valid?: `, gameValid)
  if (gameValid) {
    letUsSumTheGameNumbersWhereTheGameIsValid += gp.gameNumber;
  }
})


console.log('letUsSumTheGameNumbersWhereTheGameIsValid', letUsSumTheGameNumbersWhereTheGameIsValid)