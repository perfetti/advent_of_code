// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
import fs from 'fs';
const input = fs.readFileSync('./example2.txt', 'utf-8');


// Solves Part 1
// const countPoints = (n: number) => n === 0 ? 0 : 2**(n-1);
// let totalPoints = 0;
// const example = input.split('\n').map((line) => {
//   const [winningNumbersRaw, givenNumbersRaw] = line.split(' | ')
//   const winningNumbers = winningNumbersRaw.split(':')[1].split(' ').filter((num) => num !== "").map((num) => num);
//   const givenNumbers = givenNumbersRaw.split(' ').map((num) => num);
//   const matchingNumbers = givenNumbers.filter((num) => winningNumbers.includes(num));


//   // console.log('winningNumbers', winningNumbers);
//   // console.log('givenNumbers', givenNumbers);
//   const points = countPoints(matchingNumbers.length);
//   totalPoints += points;
//   console.log('matchingNumbers', matchingNumbers, ' points ', points);
// });
// console.log('totalPoints', totalPoints);


// Solves Part 2

const rows = input.split('\n')
const numberOfRows = rows.length;
// Create array of 1s with the length of row.length
const runningMultipliers: number[] = new Array(numberOfRows).fill(1);
// Lets us add to the running multiplier from index
const addtoRunningMultiplier = (numberOfSpacesToUpdate: number, indexOffset: number, incrementBy: number) => {
  console.log(`index ${indexOffset} incrementing ${numberOfSpacesToUpdate} by ${incrementBy}`)
  for (let i = 0; i < numberOfSpacesToUpdate; i++) {
    const updateIndex = i + indexOffset;
    // Don't update anything past the last index
    if(updateIndex < numberOfRows - 1) {
      runningMultipliers[updateIndex] += incrementBy;
    }
  }
}
console.log('runningMultipliers', runningMultipliers);
rows.map((line, index) => {
  const [winningNumbersRaw, givenNumbersRaw] = line.split(' | ')
  const winningNumbers = winningNumbersRaw.split(':')[1].split(' ').filter((num) => num !== "").map((num) => num);
  const givenNumbers = givenNumbersRaw.split(' ').map((num) => num);
  const matchingNumbers = givenNumbers.filter((num) => winningNumbers.includes(num));
  const currentMultiplier = runningMultipliers[index];
  console.log(`parsing row ${index} with multiplier ${currentMultiplier}`)
  console.log(`currentMultiplier: ${currentMultiplier}`)

  if(matchingNumbers.length > 0 ) {
    console.log(`winning, matchingNumbers: ${matchingNumbers}`)
    addtoRunningMultiplier(matchingNumbers.length, index + 1, currentMultiplier);
  }
  console.log('runningMultipliers', runningMultipliers);
});
