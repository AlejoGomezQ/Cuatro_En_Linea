const BOARD_COLUMNS = 7;
const BOARD_ROWS = 6;

const checkWinner = (gameBoard, lastPlayedRow, lastPlayedColumn) => {
  if (lastPlayedRow === undefined || lastPlayedColumn === undefined) return null;
  
  const currentPlayer = gameBoard[lastPlayedRow][lastPlayedColumn];
  if (currentPlayer === 0) return null;

  let consecutiveCount = 0;
  let winningCells = [];
  for (let column = Math.max(0, lastPlayedColumn - 3); column <= Math.min(BOARD_COLUMNS - 1, lastPlayedColumn + 3); column++) {
    if (gameBoard[lastPlayedRow][column] === currentPlayer) {
      consecutiveCount++;
      winningCells.push([lastPlayedRow, column]);
      if (consecutiveCount >= 4) return { winner: currentPlayer, cells: winningCells.slice(-4) };
    } else {
      consecutiveCount = 0;
      winningCells = [];
    }
  }

  consecutiveCount = 0;
  winningCells = [];
  for (let row = Math.max(0, lastPlayedRow - 3); row <= Math.min(BOARD_ROWS - 1, lastPlayedRow + 3); row++) {
    if (gameBoard[row][lastPlayedColumn] === currentPlayer) {
      consecutiveCount++;
      winningCells.push([row, lastPlayedColumn]);
      if (consecutiveCount >= 4) return { winner: currentPlayer, cells: winningCells.slice(-4) };
    } else {
      consecutiveCount = 0;
      winningCells = [];
    }
  }

  consecutiveCount = 0;
  winningCells = [];
  let startRow = lastPlayedRow - Math.min(lastPlayedRow, lastPlayedColumn);
  let startColumn = lastPlayedColumn - Math.min(lastPlayedRow, lastPlayedColumn);
  while (startRow < BOARD_ROWS && startColumn < BOARD_COLUMNS) {
    if (gameBoard[startRow][startColumn] === currentPlayer) {
      consecutiveCount++;
      winningCells.push([startRow, startColumn]);
      if (consecutiveCount >= 4) return { winner: currentPlayer, cells: winningCells.slice(-4) };
    } else {
      consecutiveCount = 0;
      winningCells = [];
    }
    startRow++;
    startColumn++;
  }

  consecutiveCount = 0;
  winningCells = [];
  startRow = lastPlayedRow + Math.min(BOARD_ROWS - 1 - lastPlayedRow, lastPlayedColumn);
  startColumn = lastPlayedColumn - Math.min(BOARD_ROWS - 1 - lastPlayedRow, lastPlayedColumn);
  while (startRow >= 0 && startColumn < BOARD_COLUMNS) {
    if (gameBoard[startRow][startColumn] === currentPlayer) {
      consecutiveCount++;
      winningCells.push([startRow, startColumn]);
      if (consecutiveCount >= 4) return { winner: currentPlayer, cells: winningCells.slice(-4) };
    } else {
      consecutiveCount = 0;
      winningCells = [];
    }
    startRow--;
    startColumn++;
  }

  return null;
};

export { BOARD_COLUMNS, BOARD_ROWS, checkWinner };
