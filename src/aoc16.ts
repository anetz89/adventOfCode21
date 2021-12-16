import  { read } from './importer';

export function aoc(isFirstPart=false): number {
    return parseBin(toBinString(read('./assets/aoc16.txt')))[isFirstPart? 2: 1];
}

function parseBin(bin: string): any[] { return (getType(bin) === 4)? getLiteral(bin): getOperator(bin); }
function toBinString(input: string): string { return input.split('').map(e => pad((parseInt(e, 16) >>> 0).toString(2), 4)).join(''); }
function pad(str: string, size: number): string { return (str.length === size)? str: pad('0' + str, size); }
function getVersion(input: string): number { return parseInt(input.substring(0, 3), 2); }
function getType(input: string): number { return parseInt(input.substring(3, 6), 2); }
function getVal(literals: number[], type: number): number {
    switch(type) {
        case 0: return literals.reduce((a, b) => a + b);
        case 1: return literals.reduce((a, b) => a * b);
        case 2: return literals.sort((a, b) => a - b)[0];
        case 3: return literals.sort((a, b) => a - b)[literals.length - 1];
        case 5: return literals[0] > literals[1]? 1 : 0;
        case 6: return literals[0] < literals[1]? 1 : 0;
        case 7: return literals[0] === literals[1]? 1 : 0;
        default: return 0;
    }
}

function getLiteral(input: string): any[] {
    let result = '';
    let i = 6;
    let parts = 1;
    for(; i < input.length; i += 5) {
        const val = input.substring(i + 1, i + 5);
        result += val;
        parts + 1;
        if (input[i] === '0') {
            return [input.slice(i + 5 + ((7 + parts * 5)%4)), parseInt(result, 2), getVersion(input)];
        }
    }
    return [];
}
function getOperator(input: string): any[] {
    let result = '';
    let size = 0;
    let currInput = '';
    let remainingInput = '';
    let literals: number[] = [];
    let versions: number[] = [];

    if (input[6] === '0') {
        size = parseInt(input.substring(7, 22), 2);
        currInput = input.slice(22, 22 + size);
        remainingInput = input.slice(22 + size);
    } else {
        size = parseInt(input.substring(7, 18), 2);
        currInput = input.slice(18);
    }

    while(size > 0 && currInput) {
        if (input[6] !== '0') { size -= 1; }

        const lit = parseBin(currInput);
        literals.push(lit[1]);
        versions.push(lit[2]);
        currInput = lit[0];
    }
    return [(input[6] !== '0')? currInput: remainingInput, getVal(literals, getType(input)), getVersion(input) + versions.reduce((a, b) => a + b)];
}

