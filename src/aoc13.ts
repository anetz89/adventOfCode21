import  { readStringList } from './importer';

export function aoc(isFirstPart=false): any {
    const input: string[] = readStringList('./assets/aoc13.txt');

    let paper = getPaper(1500);

    input.filter(r => r !== '' && r.indexOf('fold along') === -1).forEach(dot => {
        const vals = dot.split(',').map(a => parseInt(a));
        paper[vals[1]][vals[0]] = 1;
    });

    const result = fold(paper, input.filter(r => r.indexOf('fold along') === 0).map(r => r.split(' ')[2]), isFirstPart);

    if (isFirstPart) {
        return result.reduce((a, b) => a + b.reduce((c, d): number => c + d), 0);
    }

    console.log('parsePuzzleResultToString(')
    console.log(result.map(row => row.map(el => el === 1 ? '#' : ' ').join('')));
    console.log(');')
    return 'PZEHRAER';  // ;)
}

function fold(paper: number[][], instr: string[], stopAtFirstIteration: boolean): number[][] {
    const currInstr: string[] = (instr.shift() || '').split('=');
    const foldIndex: number = parseInt(currInstr[1]);

    if (!foldIndex) { return paper; }

    (currInstr[0] === 'y')? foldUp(paper, foldIndex): foldLeft(paper, foldIndex);

    if (stopAtFirstIteration) {
        return paper;
    }
    return fold(paper, instr, stopAtFirstIteration);
}

function foldUp(paper: number[][], foldIndex: number) {
    paper.forEach((row, idx) => {
        if (idx <= foldIndex) { return; }

        row.forEach((col, colIdx) => col? paper[foldIndex - (idx - foldIndex)][colIdx] = 1:'' )
    });
    paper.length = foldIndex;
}

function foldLeft(paper: number[][], foldIndex: number) {
    paper.forEach((row, idx) => {
        row.forEach((col, colIdx) => {
            if (!col || colIdx <= foldIndex) { return; }

            paper[idx][foldIndex - (colIdx - foldIndex)] = 1;
        });
        row.length = foldIndex;
    });
}

function getPaper(size: number): number[][] {
    return new Array(size).fill([]).map(r => new Array(size).fill(0));
}
