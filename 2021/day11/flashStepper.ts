import * as fs from 'fs';

interface Octopus {
    energyLevel: number;
    flashed: boolean;
}

const formatKey = (x: number, y: number): string => `${x}|${y}`

class OctupusGrid {
    private octoGrid: { [xy: string]: Octopus} = {};
    private gridSize: number;
    private flashes: number = 0;

    constructor(inputs: number[][]) {
        this.gridSize = inputs.length;

        inputs.forEach((row, yPos) => {
            row.forEach((energyLevel, xPos) => {
                this.octoGrid[formatKey(xPos, yPos)] = { 
                    energyLevel, 
                    flashed: false
                };
            });
        });
    }

    print() {
        const values: number[][] = [];
        this.loopGrid((octo, x, y) => {
            if(!values[x]) {
                values[x] = []
            } 

            values[x][y] = octo.energyLevel;
        })
        console.log(values);
    }

    incrementAllSetFlashedFalse() { 
        this.loopGrid((octo) => {
            octo.flashed = false;
            octo.energyLevel += 1
        })
    }

    getOcto(x: number, y: number): Octopus | undefined {
        return this.octoGrid[formatKey(x, y)]
    }

    flashOcto(x: number, y: number) {
        const octo = this.getOcto(x, y);
        if(octo && !octo.flashed) {
            this.flashes += 1;
            
            this.flashMask.forEach(([addX, addY]) => {
                const newx = x+addX;
                const newy = y+addY;
                const maskedOcto = this.getOcto(newx, newy);
                
                if(!maskedOcto) return;

                maskedOcto.energyLevel += 1;
                if(!maskedOcto?.flashed) {
                    this.flashOcto(newx, newy)
                }
            })
        }
    }

    // incrementAndCheckFlash(x: number, y: number) {
    //     const octo = this.getOcto(x, y);
    //     if(octo) {
    //         octo.energyLevel += 1;
            
    //         if(octo.energyLevel >= 9) {
    //             this.flashOcto(x, y);
    //         }
    //     }
    // }

    // Used to add to everthing around it.
    private flashMask = [
        [-1,-1], [0,-1], [1, -1],
        [-1, 0],         [1, 0],
        [-1, 1], [0, 1], [1, 1],
    ]

    setZeroAndClearFlash(octo: Octopus) {
        if(octo.energyLevel >= 9) {
            octo.energyLevel = 0
        }
    }

    step() {
        this.incrementAllSetFlashedFalse();
        this.loopGrid((octo: Octopus, x: number, y: number) => {
            if(octo.energyLevel >= 9) {
                this.flashOcto(x, y);
            }
        })
        this.loopGrid(this.setZeroAndClearFlash)
    }

    private loopGrid(callback: (input: Octopus, x: number, y: number) => void) {
        for(var x=0; x<this.gridSize; x++) {
            for(var y=0; y<this.gridSize; y++) {
                callback(this.octoGrid[formatKey(x, y)], x, y)
            }
        }
    }
}


const input: number[][]  = fs.readFileSync('testInitialState.txt').toString().split('\n').map((str) =>  str.split('').map((char) => parseInt(char)));

const grid = new OctupusGrid(input);
grid.step();
grid.print();