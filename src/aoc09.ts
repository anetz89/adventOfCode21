import  { readStringList } from './importer';


export function aoc(isFirstPart=false): number {
    const input: number[][] = readStringList('./assets/aoc09.txt').map(row => row.split('').map(e => parseInt(e)));

    return isFirstPart? getPart1(input): getPart2(input);
}

function getPart1(input: number[][]): number {
    return input.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
            return (isMinimum(input, rowIndex, colIndex, row, col))? col + 1 : 0;
        });
    }).reduce((a, b) => a + reduceRow(b), 0);
}

function getPart2(input: number[][]): number {
    const lowestPoints: number[][] = input.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
            return isMinimum(input, rowIndex, colIndex, row, col)? getBasinCount(input, rowIndex, colIndex, []) : 0;
        });
    });

    return lowestPoints.reduce((a, b) => a.concat(b), [])
                .sort((a, b) => a - b).slice(-3).reduce((a, b) => a * b);
}

function reduceRow(row: number[]): number { return row.reduce((c, d) => c + d); }

function isMinimum(input: number[][], rowIndex: number, colIndex: number, row: number[], col: number): boolean {
    return !(rowIndex >= 1 && input[rowIndex - 1][colIndex] <= col) &&  // up
        !(rowIndex < input.length - 1 && input[rowIndex + 1][colIndex] <= col) &&  // down
        !(colIndex >= 1 && input[rowIndex][colIndex - 1] <= col) &&  // left
        !(colIndex < row.length - 1 && input[rowIndex][colIndex + 1] <= col); // right
}

function getBasinCount(input: number[][], rowIndex: number, colIndex: number, usedCoordinates: string[]): number {
    const coordinate = rowIndex + '/' + colIndex;

    if (rowIndex < 0 || rowIndex >= input.length || colIndex < 0 || colIndex >= input[0].length ||
            input[rowIndex][colIndex] === 9 || usedCoordinates.indexOf(coordinate) >= 0) {
        return 0;
    }
    usedCoordinates.push(coordinate);

    return 1 + getBasinCount(input, rowIndex - 1, colIndex, usedCoordinates) +  // up
        getBasinCount(input, rowIndex, colIndex + 1, usedCoordinates) +  // right
        getBasinCount(input, rowIndex + 1, colIndex, usedCoordinates) +  // down
        getBasinCount(input, rowIndex, colIndex - 1, usedCoordinates);  // left
}
