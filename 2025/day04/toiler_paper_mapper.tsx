import fs from 'fs';

const INPUT_FILE = __dirname + "/demo_input.txt"

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

//
// Logic time
//

let accessiblePaperRolls = 0;
for(let rowIndex=0; rowIndex<lines.length; rowIndex++){
  const row = lines[rowIndex];
  console.log(row);
  for(let colIndex=0; colIndex<row.length; colIndex++){
    console.log(row[colIndex]);

    if(row[colIndex] === '@'){
      if(isAccessible(rowIndex, colIndex)){
        accessiblePaperRolls++;
      }
    }
  }
}

console.log(accessiblePaperRolls);