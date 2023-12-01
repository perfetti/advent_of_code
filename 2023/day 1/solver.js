// input.txt file loaded as a string
// const input = require('fs').readFileSync('./input.txt', 'utf8');
const input = 'two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen'
const regex = /(\d|one|two|three|four|five|six|seven|eight|nine)/g;
const convertStringtoNumberString = (str) => {
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
    default:
      return str
  }
}

var matches = input.split('\n').map((line) => line.match(regex))
const numbers = matches.map((match) => {
  const first = convertStringtoNumberString(match[0]);
  const last = convertStringtoNumberString(match[match.length - 1]);
  return parseInt(`${first}${last}`, 10);
});
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(numbers);
console.log(sum);


