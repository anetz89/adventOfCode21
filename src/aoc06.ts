import  { read } from './importer';

export function aoc(isFirstPart=false): number {
    const input: number[] = read('./assets/aoc06.txt').split(',').map(e => parseInt(e));
    let map = new Array(9).fill(0);

    input.forEach(elem => { map[elem] += 1; });

    for(let i = 0; i < (isFirstPart? 80: 256); i += 1) {
        map = newDay(map);
    }

    return map.reduce((a: number, b: number) => a + b);
}

function newDay(map: number[]): number[] {
    let result = new Array(9).fill(0);

    map.forEach((e, idx) => {
        if (idx === 0) {
            result[6] += e;
            result[8] += e;
            return;
        }
        result[idx - 1] += e;
    });

    return result;
}
