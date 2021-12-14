import  { readStringList } from './importer';

export function aoc(isFirstPart=false): number {
    const input: string[] = readStringList('./assets/aoc05.txt');

    let map: number[][] = zeros([1000, 1000]);

    input.forEach(vector => {
        map = fillMap(map, parseVector(vector), isFirstPart);
    });

    return map.map((e: number[]) => e.filter(elem => elem > 1).length).reduce((a: number, b: number) => a + b);
}

function zeros(dimensions: number[]): any[][] {
    let array: any[] = [];

    for (let i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;
}

function parseVector(vector: string): number[][] {
    return vector.split(' -> ').map(p => p.split(',').map(c => parseInt(c)))
}

function fillMap(map: number[][], vector:number[][], isFirstPart: boolean): number[][] {
    // horizontal
    if (vector[0][0] === vector[1][0]) { return h1(map, vector); }
    if (vector[0][1] === vector[1][1]) { return h2(map, vector); }
    if (isFirstPart) { return map; }
    // diagonal
    if (vector[0][0] > vector[1][0]) { return d1(map, vector); }
    return d2(map, vector);
}

function h1(map:number[][], vector: number[][]): number[][] {
    if (vector[0][1] > vector[1][1]) {
        for(let i = vector[1][1]; i <= vector[0][1]; i += 1) { map[i][vector[0][0]] += 1; }
    } else {
        for(let i = vector[0][1]; i <= vector[1][1]; i += 1) { map[i][vector[0][0]] += 1; }
    }
    return map;
}

function h2(map:number[][], vector: number[][]): number[][] {
    if (vector[0][0] > vector[1][0]) {
        for(let i = vector[1][0]; i <= vector[0][0]; i += 1) { map[vector[0][1]][i] += 1; }
    } else {
        for(let i = vector[0][0]; i <= vector[1][0]; i += 1) { map[vector[0][1]][i] += 1; }
    }
    return map;
}

function d1(map:number[][], vector: number[][]) {
    for(let i = 0; i <= vector[0][0] - vector[1][0]; i += 1) {
        const index = (vector[0][1] < vector[1][1])? vector[0][1] + i : vector[0][1] - i;
        map[index][vector[0][0] - i] += 1;
    }
    return map;
}

function d2(map:number[][], vector: number[][]) {
    for(let i = 0; i <= vector[1][0] - vector[0][0]; i += 1) {
        const index = (vector[0][1] < vector[1][1])? vector[0][1] + i : vector[0][1] - i;
        map[index][vector[0][0] + i] += 1;
    }
    return map;
}
