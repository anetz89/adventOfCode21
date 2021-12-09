import  { read } from './importer';

export function aoc(isFirstPart=false): number {
    const input: number[] = read('./assets/aoc06.txt').split(',').map(e => parseInt(e));
    const fish = new Array(9).fill(0);

    input.forEach(elem => { fish[elem] += 1; });

    return evolve(fish, isFirstPart? 80: 256).reduce((a: number, b: number) => a + b);
}

function evolve(fish: number[], days: number): number[] {
    if (days <= 0) { return fish; }

    const zero = fish.shift() || 0;  // thanks Martin!
    fish[6] += zero;
    fish.push(zero);
    return evolve(fish, days - 1);
}
