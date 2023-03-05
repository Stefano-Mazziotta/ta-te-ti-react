export const checkEndGame = (boardToCheck) => {
    return boardToCheck.every((square) => square !== null);
} 