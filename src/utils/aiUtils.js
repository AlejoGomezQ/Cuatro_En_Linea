import { BOARD_COLUMNS, BOARD_ROWS, checkWinner } from './gameUtils';

// Función para obtener las columnas disponibles (no llenas)
const getAvailableColumns = (board) => {
  const availableColumns = [];
  for (let col = 0; col < BOARD_COLUMNS; col++) {
    if (board[0][col] === 0) {
      availableColumns.push(col);
    }
  }
  return availableColumns;
};

// Función para simular un movimiento en una columna
const simulateMove = (board, column, player) => {
  const newBoard = board.map(row => [...row]);
  
  // Encontrar la fila donde caerá la ficha
  const emptyRows = newBoard.map((row, index) => row[column] === 0 ? index : -1).filter(index => index !== -1);
  if (emptyRows.length === 0) return null;
  
  const targetRow = Math.max(...emptyRows);
  newBoard[targetRow][column] = player;
  
  return { board: newBoard, row: targetRow, col: column };
};

// Función para evaluar el tablero (usado en dificultad media y difícil)
const evaluateBoard = (board, player) => {
  let score = 0;
  
  // Valorar el centro (estratégicamente valioso)
  const centerColumn = Math.floor(BOARD_COLUMNS / 2);
  const centerCount = board.filter(row => row[centerColumn] === player).length;
  score += centerCount * 3;
  
  // Buscar posibles líneas de 2 y 3 fichas
  // Horizontal
  for (let row = 0; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_COLUMNS - 3; col++) {
      const window = [board[row][col], board[row][col+1], board[row][col+2], board[row][col+3]];
      score += evaluateWindow(window, player);
    }
  }
  
  // Vertical
  for (let col = 0; col < BOARD_COLUMNS; col++) {
    for (let row = 0; row < BOARD_ROWS - 3; row++) {
      const window = [board[row][col], board[row+1][col], board[row+2][col], board[row+3][col]];
      score += evaluateWindow(window, player);
    }
  }
  
  // Diagonal ascendente
  for (let row = 3; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_COLUMNS - 3; col++) {
      const window = [board[row][col], board[row-1][col+1], board[row-2][col+2], board[row-3][col+3]];
      score += evaluateWindow(window, player);
    }
  }
  
  // Diagonal descendente
  for (let row = 0; row < BOARD_ROWS - 3; row++) {
    for (let col = 0; col < BOARD_COLUMNS - 3; col++) {
      const window = [board[row][col], board[row+1][col+1], board[row+2][col+2], board[row+3][col+3]];
      score += evaluateWindow(window, player);
    }
  }
  
  return score;
};

// Función auxiliar para evaluar una ventana de 4 posiciones
const evaluateWindow = (window, player) => {
  const opponent = player === 1 ? 2 : 1;
  const playerCount = window.filter(cell => cell === player).length;
  const emptyCount = window.filter(cell => cell === 0).length;
  const opponentCount = window.filter(cell => cell === opponent).length;
  
  // Puntajes para diferentes configuraciones
  if (playerCount === 4) return 100;
  if (playerCount === 3 && emptyCount === 1) return 5;
  if (playerCount === 2 && emptyCount === 2) return 2;
  if (opponentCount === 3 && emptyCount === 1) return -4; // Bloquear al oponente
  
  return 0;
};

// Función para verificar si un movimiento es ganador
const isWinningMove = (board, column, player) => {
  const moveResult = simulateMove(board, column, player);
  if (!moveResult) return false;
  
  const winResult = checkWinner(moveResult.board, moveResult.row, moveResult.col);
  return !!winResult;
};

// Implementación del nivel fácil: movimientos principalmente aleatorios
const getEasyMove = (board) => {
  const availableColumns = getAvailableColumns(board);
  if (availableColumns.length === 0) return null;
  
  // 20% de probabilidad de bloquear jugadas ganadoras obvias
  const opponent = 1; // La IA siempre es el jugador 2
  
  if (Math.random() < 0.2) {
    for (const column of availableColumns) {
      if (isWinningMove(board, column, opponent)) {
        return column;
      }
    }
  }
  
  // Movimiento aleatorio
  return availableColumns[Math.floor(Math.random() * availableColumns.length)];
};

// Implementación del nivel intermedio: bloquea jugadas y busca oportunidades
const getMediumMove = (board) => {
  const availableColumns = getAvailableColumns(board);
  if (availableColumns.length === 0) return null;
  
  const player = 2; // La IA
  const opponent = 1; // El jugador humano
  
  // Primero busca si puede ganar en el próximo movimiento
  for (const column of availableColumns) {
    if (isWinningMove(board, column, player)) {
      return column;
    }
  }
  
  // Luego busca si necesita bloquear al oponente (80% de probabilidad)
  if (Math.random() < 0.8) {
    for (const column of availableColumns) {
      if (isWinningMove(board, column, opponent)) {
        return column;
      }
    }
  }
  
  // Si no hay jugadas ganadoras o bloqueantes, evalúa cada columna
  let bestScore = -Infinity;
  let bestColumn = availableColumns[0];
  
  for (const column of availableColumns) {
    const moveResult = simulateMove(board, column, player);
    if (!moveResult) continue;
    
    const score = evaluateBoard(moveResult.board, player);
    if (score > bestScore) {
      bestScore = score;
      bestColumn = column;
    }
  }
  
  return bestColumn;
};

// Implementación del nivel difícil: usa minimax con profundidad limitada
const getHardMove = (board) => {
  const availableColumns = getAvailableColumns(board);
  if (availableColumns.length === 0) return null;
  
  const player = 2; // La IA
  const opponent = 1; // El jugador humano
  
  // Primero busca si puede ganar en el próximo movimiento
  for (const column of availableColumns) {
    if (isWinningMove(board, column, player)) {
      return column;
    }
  }
  
  // Luego busca si necesita bloquear al oponente
  for (const column of availableColumns) {
    if (isWinningMove(board, column, opponent)) {
      return column;
    }
  }
  
  // Si no hay jugadas ganadoras o bloqueantes, usa minimax
  let bestScore = -Infinity;
  let bestColumn = availableColumns[0];
  const depth = 3; // Profundidad de búsqueda
  
  for (const column of availableColumns) {
    const moveResult = simulateMove(board, column, player);
    if (!moveResult) continue;
    
    const score = minimax(moveResult.board, depth - 1, -Infinity, Infinity, false);
    if (score > bestScore) {
      bestScore = score;
      bestColumn = column;
    }
  }
  
  return bestColumn;
};

// Algoritmo minimax con poda alfa-beta
const minimax = (board, depth, alpha, beta, isMaximizing) => {
  const availableColumns = getAvailableColumns(board);
  
  // Casos base
  if (depth === 0) {
    return evaluateBoard(board, 2); // Evaluar desde perspectiva de la IA
  }
  
  if (availableColumns.length === 0) {
    return 0; // Empate
  }
  
  // Verificar si hay un ganador
  for (const column of availableColumns) {
    const player = isMaximizing ? 2 : 1;
    if (isWinningMove(board, column, player)) {
      return isMaximizing ? 1000 : -1000;
    }
  }
  
  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const column of availableColumns) {
      const moveResult = simulateMove(board, column, 2);
      if (!moveResult) continue;
      
      const evaluation = minimax(moveResult.board, depth - 1, alpha, beta, false);
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break; // Poda alfa-beta
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
      if (beta <= alpha) break; // Poda alfa-beta
    }
    return minEval;
  }
};

// Función principal que devuelve el movimiento según la dificultad
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
