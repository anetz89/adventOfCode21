import  { readStringList } from './importer';

let horiz: number, depth: number, aim: number;

export function aoc(isPart2=false): any {
    const list = readStringList('./assets/aoc02.txt');

    horiz = 0; depth = 0; aim = 0;

    list.forEach(instruction => {
        const inst = instruction.split(' ');
        isPart2? move2(inst[0], parseInt(inst[1])) : move1(inst[0], parseInt(inst[1]));
    });

    return depth * horiz;
}

function move1(inst: string, val: number) {
    switch(inst) {
        case 'down': depth += val; break;
        case 'up': depth -= val; break;
        case 'forward': horiz += val; break;
        default: break;
    }
}

function move2(inst: string, val: number) {
    switch(inst) {
        case 'down': aim += val; break;
        case 'up': aim -= val; break;
        case 'forward':
            horiz += val;
            depth += aim * val;
            break;
        default: break;
    }
}
