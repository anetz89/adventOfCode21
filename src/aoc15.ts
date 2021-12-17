import  { readStringList } from './importer';

export function aoc(isFirstPart=false): number {
    const map: number[][] = readStringList('./assets/aoc15.txt').map(row => row.split('').map(e => parseInt(e)));

    const topLeft = map[0][0];
    if (isFirstPart) {
        return calcMinRisk(map, [toString(map.length - 1, map[0].length - 1)])[0][0] - topLeft;
    }

    let x = 4;
    let y = 4;
    let megaMap: number[][][][] = new Array(y + 1).fill(0).map(e => new Array(x + 1));

    megaMap = propagateMegaMap(megaMap, map, [toString(x, y)])

    return megaMap[0][0][0][0] - topLeft;
}

// fill every map section starting at the bottom right section, finishing at 0|0
function propagateMegaMap(megaMap: number[][][][], origMap: number[][], checkCoords: string[]): number[][][][] {
    if (!checkCoords.length) { return megaMap; }

    const currCoord = (checkCoords.shift() || '').split(',');
    const y = parseInt(currCoord[0]);
    const x = parseInt(currCoord[1]);

    if (x - 1 >= 0 && checkCoords.indexOf(toString(y, x - 1)) < 0) { checkCoords.push(toString(y, x - 1)); }  // left
    if (y - 1 >= 0 && checkCoords.indexOf(toString(y - 1, x)) < 0) { checkCoords.push(toString(y - 1, x)); }  // up

    megaMap[y][x] = calcMinRisk(getMapSection(origMap, megaMap, x, y), [toString(origMap.length - 1, origMap[0].length - 1)]);

    return propagateMegaMap(megaMap, origMap, checkCoords)
}

// calculate values for the current map section
function getMapSection(origMap: number[][], megaMap: number[][][][], x: number, y: number): number[][] {
    // increase values
    let newMap: number[][] = origMap.map(row => row.map(e => increase(e, x + y)));

    // add neighbors
    if (x + 1 < megaMap[y].length) {
        for (let i = 0; i < newMap.length; i += 1) {
            newMap[i].push(megaMap[y][x + 1][i][0]);
        }
    }
    if (y + 1 < megaMap.length) {
        newMap.push(megaMap[y + 1][x][0]);
    }
    return newMap;
}

// populate map with risk levels
function calcMinRisk(map: number[][], checkCoords: string[]): number[][] {
    if (!checkCoords.length) { return map; }

    const currCoord = (checkCoords.shift() || '').split(',');
    const y = parseInt(currCoord[0]);
    const x = parseInt(currCoord[1]);

    if (x - 1 >= 0 && checkCoords.indexOf(toString(y, x - 1)) < 0) { checkCoords.push(toString(y, x - 1)); }  // left
    if (y - 1 >= 0 && checkCoords.indexOf(toString(y - 1, x)) < 0) { checkCoords.push(toString(y - 1, x)); }  // up

    if (x < map[y].length - 1 && y < map.length - 1) {  // right && down
        map[y][x] += map[y][x + 1] > map[y + 1][x] ? map[y + 1][x] : map[y][x + 1];
    } else if (x < map[y].length - 1) {  // right only
        map[y][x] += map[y][x + 1];
    } else if (y < map.length - 1) {  // down only
        map[y][x] += map[y + 1][x];
    }

    return calcMinRisk(map, checkCoords);
}

function toString(a: number, b: number): string { return a + ',' + b; }
function increase(num: number, val: number): number { return (num + val > 9)? (num + val) % 10 + 1 : num + val; }
