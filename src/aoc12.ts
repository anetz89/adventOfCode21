import  { readStringList } from './importer';

export function aoc(isFirstPart=false): number {
    const input: string[][] = readStringList('./assets/aoc12.txt').map(row => row.split('-'));

    return getConnections(getCave(input), 'start', 'end', ['start'], isFirstPart).length;
}

function getCave(input: string[][]): any {
    let cave: any = {};

    input.forEach(con => {
        if (!cave.hasOwnProperty(con[0])) { cave[con[0]] = []; }
        if (!cave.hasOwnProperty(con[1])) { cave[con[1]] = []; }

        cave[con[0]].push(con[1]);
        cave[con[1]].push(con[0]);
    })
    return cave;
}

function getConnections(cave: any, start: string, end: string, blockList: string[], jokerUsed: boolean): string[] {
    if(start === end) { return ['end']; }

    let currCons: string[] = [];

    let joker: boolean[] = cave[start].map((e: string) => jokerUsed);

    cave[start].forEach((con: string, idx: number) => {
        if (blockList.indexOf(con) >= 0) {
            if (joker[idx] || con === 'start') {
                return;
            }
            joker[idx] = true;
        }

        let newBlockList = [...blockList];
        if (con === con.toLowerCase()) {
            newBlockList.push(con);
        }

        currCons.push.apply(currCons, getConnections(cave, con, end, newBlockList, joker[idx]).filter(c => c.length > 0).map(c => start + ',' + c));
    });

    return currCons;
}
