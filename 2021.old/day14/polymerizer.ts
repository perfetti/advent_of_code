import fs from 'fs';

const test = false
const GLOBALCONSOLE = false;

const formatMappings = (str: string) => str.split('\n').map((str) => str.split(' -> '))
var STARTING_POLYMER: string;
var mappings: string[][];

if(test) {
    mappings = formatMappings(fs.readFileSync(__dirname + '/test_mappings.txt').toString())
    STARTING_POLYMER = fs.readFileSync(__dirname + '/test_starting_polymer.txt').toString()
} else {
    mappings = formatMappings(fs.readFileSync(__dirname + '/mappings.txt').toString())
    STARTING_POLYMER = fs.readFileSync(__dirname + '/starting_polymer.txt').toString()
}

console.log(mappings);
console.log(STARTING_POLYMER);

class Machine {
    private polyString: string = '';
    private charCounter: { [key: string]: number } = {}

    constructor(initPoly: string) {
        this.polyString = initPoly;
        initPoly.split('').forEach(this.countChar);
    }

    private countChar = (char: string) => {
        if(this.charCounter[char] === undefined) {
            this.charCounter[char] = 1
        } else {
            this.charCounter[char] += 1
        }
    }

    private getCombo(index: number): string {
        return this.polyString[index] + this.polyString[index +1]
    }

    step() {
        var newString = ''
        // Lets not affect our starting string
        const stringCopy = this.polyString.toString();

        // Last letter has no match
        for(var i: number=0; i < stringCopy.length - 1 ; i++) {
            const testCombo = this.getCombo(i)
            const matchingMapping = mappings.find(([testAgainst, _]) => {
                if(GLOBALCONSOLE) console.log('equals', testAgainst, testCombo, testAgainst == testCombo)
                return testAgainst == testCombo
            })
            if(matchingMapping){
                newString += stringCopy[i] + matchingMapping[1]
                this.countChar(matchingMapping[1]);
            } else {
                throw 'Missed a match, that should not happen';
            }
        }
        this.polyString = newString + stringCopy[stringCopy.length - 1];
    }

    private get mostFrequentLetter(): { [key: string]: number } {
        var highestNumber = 0;
        var returnObject: { [key: string]: number } = {};
        Object.keys(this.charCounter).forEach((key) => {
            const frequency = this.charCounter[key]
            if(frequency > highestNumber) {
                highestNumber = frequency
                returnObject = { [key]: frequency }
            }
        })
        return returnObject
    }

    private get leastFrequestLetter(): { [key: string]: number } {
        var lowestNumber = Infinity;
        var returnObject: { [key: string]: number } = {}; 
        Object.keys(this.charCounter).forEach((key) => {
            const frequency = this.charCounter[key]
            if(frequency<  lowestNumber) {
                returnObject = { [key]: frequency }
                lowestNumber = frequency
            }
        })
        return returnObject
    }


    print() {
        console.log(this.polyString)
    }
    printCounter() {
        console.log(JSON.stringify(this.charCounter))
        console.log('Most Frequent', this.mostFrequentLetter)
        console.log('LeastFrequent', this.leastFrequestLetter);
    }

}

const machine = new Machine(STARTING_POLYMER);

for(var i=0; i<10; i++) {
    console.log('step ' + (i+1))
    machine.step();
}

machine.printCounter();