import fs from 'fs';

const INPUT_FILE = __dirname + "/input.txt"

const input = fs.readFileSync(INPUT_FILE, "utf8");
const lines = input.split("\n").map((line) => line.split(""));


function getSurroundingPositions(rowIndex: number, colIndex: number) {
  const surroundingPositions = [
    [-1, -1],[-1, 0],[-1, 1],
    [0, -1],         [0, 1],
    [1, -1],[1, 0],[1, 1],
  ]
  return surroundingPositions.map((position) => {
    try {
      return lines[rowIndex + position[0]][colIndex + position[1]]
    } catch (error) {
      // console.log("Error at position", [[rowIndex + position[0]], [colIndex + position[1]]])
      return null;
    }
  });
}

function isAccessible(rowIndex: number, colIndex: number) {
  const surroundingPositions = getSurroundingPositions(rowIndex, colIndex);
  let toilerPaperCount = 0;
  surroundingPositions.forEach((position) => {
    if(position === '@'){
      toilerPaperCount++;
    }
  });
  return toilerPaperCount < 4;
}

type RowLocation = [number, number];

function mapAccessiblePaperRolls() {
  let accessiblePaperRolls: RowLocation[] = [];

  for(let rowIndex=0; rowIndex<lines.length; rowIndex++){
    const row = lines[rowIndex];
    for(let colIndex=0; colIndex<row.length; colIndex++){
      if(row[colIndex] === '@'){
        if(isAccessible(rowIndex, colIndex)){
          accessiblePaperRolls.push([rowIndex, colIndex]);
        }
      }
    }
  }
  return accessiblePaperRolls;
}

//
// Logic time
//
let accessiblePaperRolls = 0;
let currentAccessiblePaperRolls: RowLocation[] = mapAccessiblePaperRolls();
let round = 1;
while(currentAccessiblePaperRolls.length > 0) {
  accessiblePaperRolls += currentAccessiblePaperRolls.length;
  console.log("During round", round, "there are", currentAccessiblePaperRolls.length, "accessible paper rolls");
  console.log("Total accessible paper rolls so far:", accessiblePaperRolls);

  while(currentAccessiblePaperRolls.length > 0) {
    const [rowIndex, colIndex] = currentAccessiblePaperRolls.shift() as RowLocation;
    lines[rowIndex][colIndex] = 'x';
  }

  currentAccessiblePaperRolls = mapAccessiblePaperRolls();
  round++;
}
console.log(accessiblePaperRolls);