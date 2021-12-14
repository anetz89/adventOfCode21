import  { readStringList } from './importer';

export function aoc(isFirstPart=false): number {
    const input: string[] = readStringList('./assets/aoc14.txt');
    const finalPolymer = grow(splitPolymer(input[0]), getRules(input.slice(2)), isFirstPart? 10: 40)
    const letterCounts = countLetters(input[0], finalPolymer).sort((a, b) => a - b);

    return letterCounts[letterCounts.length - 1] - letterCounts[0];
}

function grow(counter: any, rules: any, iteration: number): string {
    if (iteration === 0) { return counter };
    return grow(growOnce(counter, rules), rules, iteration - 1);
}

function growOnce(counter: any, rules: any): any {
    const newCount: any = {};
    Object.keys(counter).forEach(pair => addPair(rules[pair], pair, counter, newCount));
    return newCount;
}

function addSingle(elem: any, originalKey: any, originalObj: any, targetObj: any) {
    if(!targetObj.hasOwnProperty(elem)) { targetObj[elem] = 0; }
    targetObj[elem] += originalObj[originalKey];
}

function addSingleBrandy(elem: any, targetObj: any) {
    const forBrandy = Math.random();
    const forBrandy2: any = {}
    forBrandy2[forBrandy] = 1;
    addSingle(elem, forBrandy, forBrandy2, targetObj)
}

function addPair(pair: any, originalKey: string, originalObj: any, targetObj: any) {
    addSingle(pair[0], originalKey, originalObj, targetObj);
    addSingle(pair[1], originalKey, originalObj, targetObj);
}

function splitPolymer(polymer: string): any {
    const count: any = {};
    polymer.split('').forEach((c, idx) => {
        const curr = c + (polymer[idx + 1] || '');
        if (curr.length === 1) { return; }
        addSingleBrandy(curr, count)
    });
    return count;
}

function getRules(ruleList: string[]): any {
    let result: any = {};

    ruleList.forEach(rule => {
        const rules = rule.split(' -> ');

        result[rules[0]] = [rules[0][0] + rules[1], rules[1] + rules[0][1]];
    });

    return result;
}

function countLetters(polymer: string, counter: any): number[] {
    const count: any = {};
    const add = polymer[0] + polymer[polymer.length - 1];

    addSingleBrandy(add, counter);

    Object.keys(counter).forEach(pair => addPair(pair.split(''), pair, counter, count));

    return Object.keys(count).map(key => count[key] / 2);
}
