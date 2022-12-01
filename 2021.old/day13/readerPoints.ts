import * as fs from "fs";
import _ from "lodash";

type Point = [number, number]
type Instruction = ['x' | 'y', number]
class State {
    public points: Point[] = [];

    constructor(points: Point[]) {
        this.points = points
    }

    get length() {
        return this.points.length
    }
}


class FoldingMachien {
    private states: State[] = [];
    get currState() {
        return this.states[this.states.length - 1];
    }
    
    constructor(points: Point[]){
        this.states.push(new State(points));
    }

    foldX(xIndex: number) {
        const updatedPoints = this.currState.points.map(([x, y]): Point => {
            const distanceFromFold = x-xIndex;
            if(distanceFromFold <= 0 ) return [x, y]
            
            const newX = xIndex - distanceFromFold
            // console.log('x was ' + x + ' and is now ' + newX);

            return [newX, y];
        })
        
        this.pushState(updatedPoints);
    }
    
    foldY(yIndex: number) {
        const updatedPoints = this.currState.points.map(([x, y]): Point => {
            const distanceFromFold = y-yIndex;
            if(distanceFromFold <= 0 ) return [x, y]

            const newY = yIndex - distanceFromFold
            // console.log('y was ' + y + ' and is now ' + newY);

            return [x, newY];
        })
    
        this.pushState(updatedPoints);
    }

    private pushState(points: Point[]) {
        const updatedPoints = _.uniqBy(points, function(item) { 
            return JSON.stringify(item); 
        })
        console.log('updatedPoints count', updatedPoints.length)
        this.states.push(new State(updatedPoints))
    }

    print() {
        console.log('CurrState')
        _.sortBy(this.currState.points).forEach((point: Point) => console.log(point))
        console.log('CurrState Length', this.currState.length)
        
    }
    save() {
        fs.writeFileSync(__dirname + '/finalPoints.json', JSON.stringify(this.currState.points))
    }
}

const points: [number, number][] = fs.readFileSync(__dirname + '/input_points.txt').toString().split('\n').map((str: string) => str.split(',')).map(([x,y]) => [parseInt(x), parseInt(y)])

const instructions: Instruction[] = fs.readFileSync(__dirname + '/elfin_instructions.txt').toString().split('\n').map((str: string) => {
    const rawInput = str.split('fold along ')[1].split('=');
    return [rawInput[0], parseInt(rawInput[1])]
}) as Instruction[];



const machine: FoldingMachien = new FoldingMachien(points);

const processInstruction = (step: Instruction) => {
    if(step[0] === 'x') {
        machine.foldX(step[1])
    } else {
        machine.foldY(step[1])
    }
}
instructions.forEach((step) => processInstruction(step));
machine.print();
machine.save();