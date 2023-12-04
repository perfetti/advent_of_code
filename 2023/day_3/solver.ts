type GridDenizen = {
  _raw: string,
  x: number,
  y: number
}
type Whammy = GridDenizen & {
  _type: "whammy"
}
type PartNumber = GridDenizen & {
  _type: "partNumber",
  partNumber: number,
  length: number,
}


const nonPeriodRegexMatcher = /(\d+)|([^\d.]+)/ig
// Sample puzzle
const engineSchematic = "\n467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598.."
const fs = require('fs');
// const engineSchematic = fs.readFileSync('input.txt', 'utf8') as string;

// We want to view this as a 2D array of characters, then find any numbers that are not touching any symbols besides a . even diagnally
const schematicLines = engineSchematic.split("\n").filter(line => line.length > 0)

const partNumbers: PartNumber[] = []
const whammies: Whammy[] = []

const partNumbersByRow: PartNumber[][] = []
const whammiesByRow: Whammy[][] = []

const addWhammy = (whammy: Omit<Whammy, '_type'>) => {
  const newWhammy: Whammy = {...whammy, _type: "whammy"};
  whammies.push(newWhammy)
  whammiesByRow[whammy.y] = whammiesByRow[whammy.y] || []
  whammiesByRow[whammy.y].push(newWhammy)
  return whammy
}

const addPartNumber = (partNumber: Omit<PartNumber, '_type'>) => {
  const newPartNumber: PartNumber = {...partNumber, _type: "partNumber"};
  partNumbers.push(newPartNumber)
  partNumbersByRow[partNumber.y] = partNumbersByRow[partNumber.y] || []
  partNumbersByRow[partNumber.y].push(newPartNumber)
  return partNumber
}

// Build list of PartNumbers and Whammies
schematicLines.forEach((line, index) => {
  const y = schematicLines.length - index

  const matches = Array.from(line.matchAll(nonPeriodRegexMatcher))

  matches.forEach((match) => {
    const parsed = Number(match[0]);
    // console.log("match:", match[0], " ", match.index, " ", match.length)
    if(isNaN(parsed)) {
      const whammy = addWhammy({
        _raw: match[0],
        x: match.index as number,
        y
      })
      // console.log("y:", y, " ", whammy);
    } else {
      const partNumber = addPartNumber({
        _raw: match[0],
        x: match.index as number,
        y,
        partNumber: parsed,
        length: match[0].length
      })
    }
    // console.log("y:", y, " ", parsed);
  })
});

// Filter out partNumbers that are touching a whammy
const validPartNumbers: PartNumber[] = [];

partNumbers.forEach((partNumber) => {
  const {x, y, length} = partNumber;
  let isValid = false;
  // Check the offsets
  [-1, 0, 1].forEach((yOffset) => {
    // Iterate over whammies if they exist
    whammiesByRow[y + yOffset]?.forEach((whammy) => {
      // If it is touching a whammy even diagonally, it is valid
      if(whammy.x >= x-1 && whammy.x <= x + length + 1) {
        isValid = true;
      }
    })
  });

  if(isValid) {
    validPartNumbers.push(partNumber)
  }
})

console.log('Valid partNumbers:', validPartNumbers)
console.log('Added up the partNumbers:', validPartNumbers.reduce((sum, partNumber) => sum + partNumber.partNumber, 0))
