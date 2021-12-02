import  { readStringList } from './importer';

export function aoc(isFirstPart=false): any {
    const list = readStringList('./assets/aoc02.txt');

    return isFirstPart? move1(list.shift(), list): move2(list.shift(), list);
}

function move1(next: string | undefined, list: string[],  horiz=0, depth=0, aim=0): number {
    if (!next) { return horiz * depth; }

    const inst = next.split(' ');

    switch(inst[0]) {
        case 'down': return move1(list.shift(), list, horiz, depth + parseInt(inst[1]));
        case 'up': return move1(list.shift(), list, horiz, depth - parseInt(inst[1]));
        case 'forward': return move1(list.shift(), list, horiz + parseInt(inst[1]), depth);
        default: return 0;
    }
}

function move2(next: string | undefined, list: string[], horiz=0, depth=0, aim=0): number {
    if (!next) { return horiz * depth; }

    const inst = next.split(' ');
    const val = parseInt(inst[1])

    switch(inst[0]) {
        case 'down': return move2(list.shift(), list, horiz, depth, aim + val);
        case 'up': return move2(list.shift(), list, horiz, depth, aim - val);
        case 'forward': return move2(list.shift(), list, horiz + val, depth + (val * aim), aim);
        default: return 0;
    }
}
