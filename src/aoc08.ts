import  { readStringList } from './importer';


export function aoc(isFirstPart=false): number {
    let input: string[][] = readStringList('./assets/aoc08.txt').map(s => s.split(' | '));

    return isFirstPart? countSimpleNumbers(input): solvePuzzle(input);
}

function countSimpleNumbers(input: string[][]): number { return input.map(line => line[1].split(' ').filter(isSimpleNumber).length ).reduce((a, b) => a + b); }
function isSimpleNumber(val:string) { return val.length === 2 || val.length === 4 || val.length === 3 || val.length === 7; }


function sortKey(key: string): string { return key.split('').sort().join(''); }
function reduce(num1: string, num2: string): string { return num1.replace(new RegExp('(' + num2.split('').join('|') + ')', 'g'), ''); }
function get(input: string[], len: number): string[] { return input.filter(val => val.length === len); }

function getNumberMap(input: string[]): any {
    let map: any = {};

    let ONE = get(input, 2)[0];
    let SEVEN = get(input, 3)[0];
    let FOUR = get(input, 4)[0];
    let EIGHT = get(input, 7)[0];

    let fivers = get(input, 5);
    let sixes = get(input, 6);

    let THREE = fivers.filter(val => reduce(val, SEVEN).length === 2)[0];
    let NINE = sixes.filter(val => reduce(val, THREE).length === 1)[0];
    let E = reduce(EIGHT, NINE);

    let TWO = fivers.filter(val => reduce(val, E).length === 4)[0];
    let FIVE = fivers.filter(val => val !== TWO && val !== THREE)[0];

    let SIX = sixes.filter(val => val !== NINE && reduce(val, FIVE).length === 1)[0];
    let ZERO = sixes.filter(val => val !== SIX && val !== NINE)[0];

    map[ZERO] = '0';
    map[ONE] = '1';
    map[TWO] = '2';
    map[THREE] = '3';
    map[FOUR] = '4';
    map[FIVE] = '5';
    map[SIX] = '6';
    map[SEVEN] = '7';
    map[EIGHT] = '8';
    map[NINE] = '9';

    return map;
}

function solvePuzzleRow(input: string[]): number {
    const solutionMap = getNumberMap(input[0].split(' ').map(sortKey));

    return parseInt(input[1].split(' ').map(val => solutionMap[sortKey(val)]).join(''));
}

function solvePuzzle(input: string[][]): number { return input.map(row => solvePuzzleRow(row)).reduce((a, b) => a + b); }

