import { Player } from "./roller";

// It's a recursive issue;
type RollResult = {
    player1: Player,
    player2: Player,   
    1: RollResult,
    2: RollResult,
    3: RollResult,
};

const player1: Player = {
    score: 0,
    space: 7,
}

const player2: Player = {
    score: 0,
    space: 10,
}
