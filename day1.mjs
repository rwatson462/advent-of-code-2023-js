import { readfile } from "./readfile.mjs";
import { first, last } from './utils.mjs';

const input = readfile('./data/1');

// Part 1 example input
// const input = [
//   '1abc2',
//   'pqr3stu8vwx',
//   'a1b2c3d4e5f',
//   'treb7uchet',
// ];

// Part 2 example input
// const input = [
//   'two1nine',
//   'eightwothree',
//   'abcone2threexyz',
//   'xtwone3four',
//   '4nineeightseven2',
//   'zoneight234',
//   '7pqrstsixteen',
// ];

const part1 = () => input.reduce((acc,cur) => {
    const numbers = cur.replace(/\D/g, '');

    return acc + (
      Number(first(numbers)) * 10 + Number(last(numbers))
    )
  },
  0
);

const numberList = [
  "one","two","three","four","five","six","seven","eight","nine", 1,2,3,4,5,6,7,8,9
];

const convertNumber = num => ({
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
  }[num] ?? Number(num)
);

const part2 = () => input.reduce((acc,cur) => {
  const firstNumber = convertNumber(first(numberList
    .map(num => cur.indexOf(num))
    .map((num, idx) => [numberList[idx], num])
    .filter(([numString,idx]) => idx > -1)
    .sort(([numA,idxA], [numB, idxB]) => idxA - idxB)
    .map(([num, _]) => num)));

  const lastNumber = convertNumber(last(numberList
    .map(num => cur.lastIndexOf(num))
    .map((num, idx) => [numberList[idx], num])
    .filter(([numString,idx]) => idx > -1)
    .sort(([numA,idxA], [numB, idxB]) => idxA - idxB)
    .map(([num, _]) => num)));

  return acc + (
    firstNumber * 10 + lastNumber
  )
},
0
);

console.log(part2());
