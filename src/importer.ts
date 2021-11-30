import fs from 'fs';


export function read(input: string): string {
    try {
        return fs.readFileSync(input, {encoding:'utf8'});
    } catch (err) {
        console.error(err);
    }
    return '';
}

export function readStringList(input: string): string[] {
    return read(input).split(/\r?\n/);
}

export function readNumberList(input: string): number[] {
    return readStringList(input).map(elem => parseInt(elem || '0', 10));
}


export function readStringBlock(input: string): string[] {
    return read(input).split(/\r?\n\r?\n/);
}
