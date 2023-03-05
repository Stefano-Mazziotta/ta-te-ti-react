import { WINNING_COMBINATIONS } from "../constants";

export const checkWinner = (boardToCheck) => {

    // check all winning combinations
    for (const combination of WINNING_COMBINATIONS){
      const [a,b,c] = combination;

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a];
      }
    }

    return null;
}