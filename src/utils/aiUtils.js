import { BOARD_COLUMNS, BOARD_ROWS, checkWinner } from './gameUtils';

const getAvailableColumns = (board) => {
  const availableColumns = [];
  for (let col = 0; col < BOARD_COLUMNS; col++) {
    if (board[0][col] === 0) {
      availableColumns.push(col);
    }
  }
  return availableColumns;
};

const simulateMove = (board, column, player) => {
  const newBoard = board.map(row => [...row]);
  
  const emptyRows = newBoard.map((row, index) => row[column] === 0 ? index : -1).filter(index => index !== -1);
  if (emptyRows.length === 0) return null;
  
  const targetRow = Math.max(...emptyRows);
  newBoard[targetRow][column] = player;
  
  return { board: newBoard, row: targetRow, col: column };
};

const evaluateBoard = (board, player) => {
  let score = 0;
  
  const centerColumn = Math.floor(BOARD_COLUMNS / 2);
  const centerCount = board.filter(row => row[centerColumn] === player).length;
  score += centerCount * 3;
  
  const windowPatterns = [];
  
  board.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      if (colIndex <= BOARD_COLUMNS - 4) {
        windowPatterns.push([row[colIndex], row[colIndex+1], row[colIndex+2], row[colIndex+3]]);
      }
      
      if (rowIndex <= BOARD_ROWS - 4) {
        if (colIndex <= BOARD_COLUMNS - 4) {
          windowPatterns.push([board[rowIndex][colIndex], board[rowIndex+1][colIndex+1], board[rowIndex+2][colIndex+2], board[rowIndex+3][colIndex+3]]);
        }
        
        windowPatterns.push([board[rowIndex][colIndex], board[rowIndex+1][colIndex], board[rowIndex+2][colIndex], board[rowIndex+3][colIndex]]);
        
        if (colIndex >= 3) {
          windowPatterns.push([board[rowIndex][colIndex], board[rowIndex+1][colIndex-1], board[rowIndex+2][colIndex-2], board[rowIndex+3][colIndex-3]]);
        }
      }
    });
  });
  
  windowPatterns.forEach(window => {
    score += evaluateWindow(window, player);
  });
  
  return score;
};

const evaluateWindow = (window, player) => {
  const opponent = player === 1 ? 2 : 1;
  const playerCount = window.filter(cell => cell === player).length;
  const emptyCount = window.filter(cell => cell === 0).length;
  const opponentCount = window.filter(cell => cell === opponent).length;
  
  if (playerCount === 4) return 100;
  if (playerCount === 3 && emptyCount === 1) return 5;
  if (playerCount === 2 && emptyCount === 2) return 2;
  if (opponentCount === 3 && emptyCount === 1) return -4;
  
  return 0;
};

const isWinningMove = (board, column, player) => {
  const moveResult = simulateMove(board, column, player);
  if (!moveResult) return false;
  
  const winResult = checkWinner(moveResult.board, moveResult.row, moveResult.col);
  return !!winResult;
};

const getEasyMove = (board) => {
  const availableColumns = getAvailableColumns(board);
  if (availableColumns.length === 0) return null;
  
  const opponent = 1;
  
  if (Math.random() < 0.2) {
    const blockingMove = availableColumns.find(column => isWinningMove(board, column, opponent));
    if (blockingMove !== undefined) return blockingMove;
  }
  
  return availableColumns[Math.floor(Math.random() * availableColumns.length)];
};

const getMediumMove = (board) => {
  const availableColumns = getAvailableColumns(board);
  if (availableColumns.length === 0) return null;
  
  const player = 2;
  const opponent = 1;
  
  const winningMove = availableColumns.find(column => isWinningMove(board, column, player));
  if (winningMove !== undefined) return winningMove;
  
  if (Math.random() < 0.8) {
    const blockingMove = availableColumns.find(column => isWinningMove(board, column, opponent));
    if (blockingMove !== undefined) return blockingMove;
  }
  
  const columnScores = availableColumns.map(column => {
    const moveResult = simulateMove(board, column, player);
    if (!moveResult) return { column, score: -Infinity };
    return { column, score: evaluateBoard(moveResult.board, player) };
  });
  
  columnScores.sort((a, b) => b.score - a.score);
  return columnScores[0].column;
};

const getHardMove = (board) => {
  const availableColumns = getAvailableColumns(board);
  if (availableColumns.length === 0) return null;
  
  const player = 2;
  const opponent = 1;
  
  const winningMove = availableColumns.find(column => isWinningMove(board, column, player));
  if (winningMove !== undefined) return winningMove;
  
  const blockingMove = availableColumns.find(column => isWinningMove(board, column, opponent));
  if (blockingMove !== undefined) return blockingMove;
  
  const depth = 3;
  
  const columnScores = availableColumns.map(column => {
    const moveResult = simulateMove(board, column, player);
    if (!moveResult) return { column, score: -Infinity };
    return { column, score: minimax(moveResult.board, depth - 1, -Infinity, Infinity, false) };
  });
  
  columnScores.sort((a, b) => b.score - a.score);
  return columnScores[0].column;
};

const minimax = (board, depth, alpha, beta, isMaximizing) => {
  const availableColumns = getAvailableColumns(board);
  
  if (depth === 0) {
    return evaluateBoard(board, 2);
  }
  
  if (availableColumns.length === 0) {
    return 0;
  }
  
  const player = isMaximizing ? 2 : 1;
  const winningColumn = availableColumns.find(column => isWinningMove(board, column, player));
  if (winningColumn !== undefined) {
    return isMaximizing ? 1000 : -1000;
  }
  
  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const column of availableColumns) {
      const moveResult = simulateMove(board, column, 2);
      if (!moveResult) continue;
      
      const evaluation = minimax(moveResult.board, depth - 1, alpha, beta, false);
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const column of availableColumns) {
      const moveResult = simulateMove(board, column, 1);
      if (!moveResult) continue;
      
      const evaluation = minimax(moveResult.board, depth - 1, alpha, beta, true);
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

const getAIMove = (board, difficulty) => {
  switch (difficulty) {
    case 'easy':
      return getEasyMove(board);
    case 'medium':
      return getMediumMove(board);
    case 'hard':
      return getHardMove(board);
    default:
      return getEasyMove(board);
  }
};

export { getAIMove };
