import  { readStringList } from './importer';

const pointMap: any = {
    '(': 1,
    ')': 3,
    '[': 2,
    ']': 57,
    '{': 3,
    '}': 1197,
    '<': 4,
    '>': 25137
};

export function aoc(isFirstPart=false): number {
    const input: string[][] = readStringList('./assets/aoc10.txt').map(row => row.split(''));

    if (isFirstPart) {
        return input.map(line => getLineVal(line, [], isFirstPart)).reduce((a, b) => a + b);
    }

    const result = input.map(line => getLineVal(line, [])).filter(val => val !== 0).sort((a, b) => a - b);

    return result[Math.floor(result.length / 2)];
}


function getLineVal(line: string[], openBrackets: string[], isFirstPart = false): number {
    if (line.length === 0) {
        return isFirstPart? 0 : getPointsForMissingBrackets(openBrackets);
    }

    const currVal = line.shift() || '';

    if(isOpenBracket(currVal)) {
        openBrackets.push(currVal);
    } else if (isCorrectClosingBracket(currVal, openBrackets)) {
        openBrackets.pop();
    } else if (isFirstPart) {
        return pointMap[currVal] || 0;
    } else {
        return 0;
    }
    return getLineVal(line, openBrackets, isFirstPart);
}

function isOpenBracket(val: string): boolean { return /(\(|\[|\{|\<)/.test(val); }
function isCorrectClosingBracket(val: string, openBrackets: string[]): boolean {
    if (openBrackets.length === 0) { return false; }

    switch(openBrackets[openBrackets.length - 1]) {
        case '(': return val === ')';
        case '[': return val === ']';
        case '{': return val === '}';
        case '<': return val === '>';
        default: return false;
    }
}

function getPointsForMissingBrackets(missingBrackets: string[], score = 0): number {
    const nextVal : string|undefined = missingBrackets.pop();

    if (!nextVal) { return score; }

    return getPointsForMissingBrackets(missingBrackets, score * 5 + pointMap[nextVal]);
}
