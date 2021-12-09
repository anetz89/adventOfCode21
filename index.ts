import { aoc } from './src/aoc09';

console.time('execution_complete');

console.time('execution_part1');
console.log('PART1: ' + aoc(true));
console.timeEnd('execution_part1');

console.time('execution_part2');
console.log('PART2: ' + aoc());
console.timeEnd('execution_part2');

console.timeEnd('execution_complete');
