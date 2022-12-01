
interface Dice {
    timesRolled:  number;
    roll: (times: number) => number[];
}

class DeterministicDice implements Dice {
    private numRolls: number = 0;
    
    constructor(){
        this.numRolls = 0;
    }

    public roll(times: number) {
        console.log('rolls from to ', this.numRolls, this.numRolls + times);
        const rolls = []
        for(var i=0; i<times; i++){
            rolls.push(this.numRolls + i + 1);
        }
        this.numRolls += times;
        return rolls;
    }
    get timesRolled() {
        return this.numRolls;
    }
}

export type Player = {
    score: number,
    space: number,
}


class GameEngine {
    private WINNING_SCORE = 1000;
    private die: DeterministicDice = new DeterministicDice();
    
    private player1: Player = {
        score: 0,
        space: 0,
    }

    private player2: Player = {
        score: 0,
        space: 0,
    }

    private isPlayer1Turn = true;

    private gameOver = false;

    constructor(player1Space: number, player2Space: number) {
        this.player1.space = player1Space;
        this.player2.space = player2Space;
    }

    movePlayer(player: Player, moves: number){
        const currSpace = player.space;
        const movedTo = (currSpace + moves) % 10;
        console.log('moved from to ', player.space, movedTo === 0 ? 10 : movedTo)
        player.space = movedTo === 0 ? 10 : movedTo;
    }

    turn() {
        const moves = this.die.roll(3).reduce((acc, curr) => acc + curr, 0);

        if(this.isPlayer1Turn) {
            this.movePlayer(this.player1, moves)
            this.player1.score += this.player1.space;
        } else {
            this.movePlayer(this.player2, moves)
            this.player2.score += this.player2.space;
        }

        if(this.isGameOver) {
            this.gameOver = true;
            console.log('****SCORES*****')
            console.log('Player1 score ', this.player1.score);
            console.log('Player2 score ', this.player2.score);
            console.log('Time Rolled ', this.die.timesRolled);
        }

        this.isPlayer1Turn = !this.isPlayer1Turn;
    }

    finishGame() {
        while(!this.gameOver) {
            this.turn();
        }
    }


    get isGameOver() {
        return this.player1.score >= this.WINNING_SCORE || this.player2.score >= this.WINNING_SCORE
    }
}


// First Input 7 and 10;
new GameEngine(7, 10).finishGame();