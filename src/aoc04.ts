import  { readStringList } from './importer';

const bingoRegex = /\#\#(((\s00 00 00 00 00\s\#.{16}\#.{16}\#.{16}\#.{16}|.{16}\#\s00 00 00 00 00\s\#.{16}\#.{16}\#.{16}|.{16}\#.{16}\#\s00 00 00 00 00\s\#.{16}\#.{16}|.{16}\#.{16}\#.{16}\#\s00 00 00 00 00\s\#.{16}|.{16}\#.{16}\#.{16}\#.{16}\#\s00 00 00 00 00\s)\#)|((\s00.{12}\s\#){5}|(\s.{3}00.{9}\s\#){5}|(\s.{6}00.{6}\s\#){5}|(\s.{9}00.{3}\s\#){5}}|(.{12}00\s\#){5}))\#/g;

function pad(numberVal: string) { return (numberVal.length === 1)? '\\s\\s' + numberVal : '\\s' + numberVal; }
function replaceAll(str: string, find: string, replace: string) { return str.replace(new RegExp(find, 'g'), replace); }
function clearMatrix(matrix: string): string { return matrix.replace(/(##\s|\s##)/g, '').replace(/\s#\s/g, ' ').replace(/\s\s/g, ' ').trim(); }
function sumNumbers(matrix: string): number { return clearMatrix(matrix).split(' ').map(e => parseInt(e)).reduce((a, b) => a + b); }
function getResult(matrix: string, drawnNumber: string): number { return sumNumbers(matrix) * parseInt(drawnNumber.replace(/(\\s\\s|\\s)/, ''))}
function removeWinner(puzzles: string, roundResult: string, roundWinner: string) {
    const roundWinnerIndex = roundResult.indexOf(roundWinner);
    return puzzles.replace(puzzles.substring(roundWinnerIndex, roundWinnerIndex + roundWinner.length), '');
}

export function aoc(isFirstPart=false): number {
    const input: any[] = readStringList('./assets/aoc04.txt');
    const drawnNumbers: string[] = input.shift().split(',').map(pad);
    let puzzles: string = ('# ' + input.join(' # ') + ' #  #').replace(/\#\s\s\#/g, '####');

    for(let i = 4; i < drawnNumbers.length; i +=1) {
        let roundResult = replaceAll(puzzles, '(' + drawnNumbers.slice(0, i + 1).join('|') + ')', ' 00');
        const roundWinner = roundResult.match(bingoRegex);

        if (roundWinner) {
            roundWinner.reverse().forEach(winner => {
                puzzles = removeWinner(puzzles, roundResult, winner);
            });

            if (isFirstPart || puzzles.length === 4) {
                return getResult(roundWinner[0], drawnNumbers[i]);
            }
        }
    }
    return 0;
}
