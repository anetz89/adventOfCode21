import  { read } from './importer';


export function aoc(isFirstPart=false): number {
    const input: number[] = read('./assets/aoc07.txt').split(',').map(n => parseInt(n));

    return searchFuelLevel(input, 0, calcFuelLevel(input, 0, isFirstPart), isFirstPart);
}

function searchFuelLevel(input: number[], value: number, valueToBet: number, isFirstPart: boolean): number {
    const newFuelValue = calcFuelLevel(input, value + 1, isFirstPart);
    if (newFuelValue > valueToBet || value >= input[input.length - 1]) {
        return valueToBet;
    }
    return searchFuelLevel(input, value + 1, newFuelValue, isFirstPart);
}

function calcFuelLevel(input: number[], target: number, isFirstPart: boolean): number {
    return input.map(e => isFirstPart? calcFuelRate(e, target): calcFuelRate2(e, target)).reduce((a, b) => a + b);
}
function calcFuelRate(number: number, target: number): number {
    return Math.abs(number - target);
}
function calcFuelRate2(number: number, target: number): number {
    if (number === target) { return 0; }
    return calcFuelRate(number, target) + calcFuelRate2((number > target)? number - 1: number + 1, target);
}
