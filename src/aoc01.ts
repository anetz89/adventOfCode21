import  { readNumberList } from './importer';

export function aoc(isPart2=false): any {
    let list = readNumberList('./assets/aoc01.txt');

    if (isPart2) {
        list = list.map((elem, idx): number => elem + list[idx + 1] + list[idx + 2]);
    }

    return list.map((elem, idx): number => (elem > list[idx - 1])? 1 : 0)
               .reduce((a: number, b: number) => a + b);
}

