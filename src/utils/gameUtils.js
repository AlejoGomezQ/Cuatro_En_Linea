const BOARD_COLUMNS = 7;
const BOARD_ROWS = 6;

const checkHorizontal = (gameBoard, row, column, player) => {
  let consecutiveCount = 0;
  let winningCells = [];
  
  for (let col = Math.max(0, column - 3); col <= Math.min(BOARD_COLUMNS - 1, column + 3); col++) {
    if (gameBoard[row][col] === player) {
      consecutiveCount++;
      winningCells.push([row, col]);
      if (consecutiveCount >= 4) return { winner: player, cells: winningCells.slice(-4) };
    } else {
      consecutiveCount = 0;
      winningCells = [];
    }
  }
  
  return null;
};

const checkVertical = (gameBoard, row, column, player) => {
  let consecutiveCount = 0;
  let winningCells = [];
  
  for (let r = Math.max(0, row - 3); r <= Math.min(BOARD_ROWS - 1, row + 3); r++) {
    if (gameBoard[r][column] === player) {
      consecutiveCount++;
      winningCells.push([r, column]);
      if (consecutiveCount >= 4) return { winner: player, cells: winningCells.slice(-4) };
    } else {
      consecutiveCount = 0;
      winningCells = [];
    }
  }
  
  return null;
};

const checkDiagonalDown = (gameBoard, row, column, player) => {
  let consecutiveCount = 0;
  let winningCells = [];
  
  let startRow = row - Math.min(row, column);
  let startColumn = column - Math.min(row, column);
  
  while (startRow < BOARD_ROWS && startColumn < BOARD_COLUMNS) {
    if (gameBoard[startRow][startColumn] === player) {
      consecutiveCount++;
      winningCells.push([startRow, startColumn]);
      if (consecutiveCount >= 4) return { winner: player, cells: winningCells.slice(-4) };
    } else {
      consecutiveCount = 0;
      winningCells = [];
    }
    startRow++;
    startColumn++;
  }
  
  return null;
};

const checkDiagonalUp = (gameBoard, row, column, player) => {
  let consecutiveCount = 0;
  let winningCells = [];
  
  let startRow = row + Math.min(BOARD_ROWS - 1 - row, column);
  let startColumn = column - Math.min(BOARD_ROWS - 1 - row, column);
  
  while (startRow >= 0 && startColumn < BOARD_COLUMNS) {
    if (gameBoard[startRow][startColumn] === player) {
      consecutiveCount++;
      winningCells.push([startRow, startColumn]);
      if (consecutiveCount >= 4) return { winner: player, cells: winningCells.slice(-4) };
    } else {
      consecutiveCount = 0;
      winningCells = [];
    }
    startRow--;
    startColumn++;
  }
  
  return null;
};

const checkWinner = (gameBoard, lastPlayedRow, lastPlayedColumn) => {
  if (lastPlayedRow === undefined || lastPlayedColumn === undefined) return null;
  
  const currentPlayer = gameBoard[lastPlayedRow][lastPlayedColumn];
  if (currentPlayer === 0) return null;

  return checkHorizontal(gameBoard, lastPlayedRow, lastPlayedColumn, currentPlayer) ||
         checkVertical(gameBoard, lastPlayedRow, lastPlayedColumn, currentPlayer) ||
         checkDiagonalDown(gameBoard, lastPlayedRow, lastPlayedColumn, currentPlayer) ||
         checkDiagonalUp(gameBoard, lastPlayedRow, lastPlayedColumn, currentPlayer);
};

export { BOARD_COLUMNS, BOARD_ROWS, checkWinner };
