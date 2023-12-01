// input.txt file loaded as a string
// const input = require('fs').readFileSync('./input.txt', 'utf8');
// const input = require('fs').readFileSync('./example.txt', 'utf8');
const input = '1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet';
const regex = /(\d)/g;

var matches = input.split('\n').map((line) => line.match(regex))
const numbers = matches.map((match) => {
  const first = match[0];
  const last = match[match.length - 1];
  return parseInt(`${first}${last}`, 10);
});

console.log(numbers);


