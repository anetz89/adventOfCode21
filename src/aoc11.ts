import  { readStringList } from './importer';

export function aoc(isFirstPart=false): number {
    const input: number[][] = readStringList('./assets/aoc11.txt').map(row => row.split('').map(v => parseInt(v)));

    return step(input, isFirstPart? 100: -1);
}

function step(input: number[][], remainingSteps: number, totalFlashes = 0): number {
    if(remainingSteps === 0) { return totalFlashes; }

    input = performStep(input);

    if(input.reduce((a, b) => a + b.reduce((c, d) => c + d), 0) === 0) {
        return Math.abs(remainingSteps);
    }

    return step(input, remainingSteps - 1, totalFlashes + getZeros(input))
}

function performStep(input: number[][]): number[][] {
    for(let i = 0; i < input.length; i += 1) {
        for(let j = 0; j < input.length; j += 1) {
            if (input[i][j] !== -1) {
                input = handle(input, i, j)
            }
        }
    }
    return input.map(row => row.map(v => v === -1? 0: v));
}

function flash(input: number[][], i: number, j: number) {
    input[i][j] = -1;
    input = handle(input, i - 1, j - 1);
    input = handle(input, i - 1, j);
    input = handle(input, i - 1, j + 1);
    input = handle(input, i, j - 1);
    input = handle(input, i, j + 1);
    input = handle(input, i + 1, j - 1);
    input = handle(input, i + 1, j);
    input = handle(input, i + 1, j + 1);
    return input;
}

function handle(input: number[][], i: number, j: number) {
    if (i < 0 || j < 0 || i > input.length - 1 || j > input.length - 1 || input[i][j] === -1) {
        return input;
    }

    input[i][j] += 1;
    if (input[i][j] > 9) {
        flash(input, i, j);
    }

    return input;
}

function getZeros(input: number[][]): number {
    return input.reduce((a, b) => a + b.filter(val => val === 0).length, 0);
}
