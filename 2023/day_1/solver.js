// input.txt file loaded as a string
import fs from 'fs';
const input = fs.readFileSync('./input.txt', 'utf8');
// const input = 'eightcdl979gxzv97eightwogdv\ntwo1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen'
const regex = /(\d|eightwo|eighthree|threeight|twone|nineight|one|two|three|four|five|six|seven|eight|nine)/g;
const convertStringtoNumberString = (str, first = true) => {
  switch (str) {
    case 'one':
      return '1';
    case 'two':
      return '2';
    case 'three':
      return '3';
    case 'four':
      return '4';
    case 'five':
      return '5';
    case 'six':
      return '6';
    case 'seven':
      return '7';
    case 'eight':
      return '8';
    case 'nine':
      return '9';
    case 'eightwo':
      return first ? '8' : '2';
    case 'eighthree':
      return first ? '8' : '3';
    case 'threeight':
      return first ? '3' : '8';
    case 'twone':
      return first ? '2' : '1';
    case 'nineight':
      return first ? '9' : '8';
    default:
      return [str]
  }
}
let result = '';

const numbers = input.split('\n').map((line) => {
  const match = line.match(regex);
  const {[0]: first, [match.length - 1]: last} = match;
  const parsedFirst = convertStringtoNumberString(first, true);
  const parsedLast = convertStringtoNumberString(last, false);

  const log = ['\n\nline ', line,
    '\nfirst ', first,
    ' parsedFirst ', parsedFirst,
    '\nlast ', last,
    ' parsedLast ', parsedLast].join('');
  result += log;
  console.log(log);
  return parseInt(`${parsedFirst}${parsedLast}`, 10);
});

// write result to file
fs.writeFileSync('./result.txt', result);

const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(numbers);
console.log(sum);


