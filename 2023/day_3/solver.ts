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
// const engineSchematic = "\n467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598.."
const fs = require('fs');
const engineSchematic = fs.readFileSync('input.txt', 'utf8') as string;

// We want to view this as a 2D array of characters, then find any numbers that are not touching any symbols besides a . even diagnally
let lastLength: number
const schematicLines = engineSchematic.split(/(\n)/).filter(line => {
  console.log("length", line.length)
  if(lastLength && lastLength !== line.length) {
    // throw new Error("Lines are not all the same length")
  }
  lastLength = line.length
  return line.length > 0
})
console.log(engineSchematic.split(/(\r|\n)/))
console.log(schematicLines)

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
  const y = index

  const matches = Array.from(line.matchAll(nonPeriodRegexMatcher))

  matches.forEach((match) => {
    const raw = match[0];
    const length = raw.length;
    const partNumber = Number(match[0]);
    if(isNaN(partNumber)) {
      addWhammy({
        _raw: raw,
        x: match.index as number,
        y
      })
    } else {
       addPartNumber({
        _raw: raw,
        x: match.index as number,
        y,
        partNumber,
        length,
      })
    }
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


// console.log('Whammies[0]:', whammiesByRow[0])
// console.log('Whammies[1]:', whammiesByRow[1])
// console.log('PartNumbers[0]:', partNumbersByRow[0])
// console.log('PartNumbers[1]:', partNumbersByRow[1])
console.log(`PartNumbers${partNumbersByRow.length-1}:`, partNumbersByRow[partNumbersByRow.length-1])
// console.log('Valid partNumbers:', validPartNumbers)
fs.writeFileSync('output.txt', validPartNumbers.map((pr) => JSON.stringify(pr)).join('\n'))
// console.log(validPartNumbers.map(partNumber => partNumber.partNumber))
console.log('Added up the partNumbers:', validPartNumbers.reduce((sum, partNumber) => sum + partNumber.partNumber, 0))



// list all the unique whammies
const uniques = whammies.reduce((uniqueWhammies, whammy) => {
  if(!uniqueWhammies.includes(whammy._raw)) {
    uniqueWhammies.push(whammy._raw)
  }
  return uniqueWhammies
}, [] as string[]);

console.log('Unique whammies:', uniques)