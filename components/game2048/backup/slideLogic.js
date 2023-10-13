/* eslint-disable */
export const getEmptyBoard = () => {
  const board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  return board;
};

const maxValue = (board) => {
  let max = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] > max) {
        max = board[i][j];
      }
    }
  }
  return max;
};

export const scoreCalculator = (board) => {
  const score = Object();
  board.forEach((item) => {
    item.forEach((val) => {
      if (val > 0) {
        if (val in score) {
          score[val] = score[val] + 1;
        } else {
          score[val] = 1;
        }
      }
    });
  });
  let result = 0;
  const keys = Object.keys(score);
  keys.forEach((key) => {
    if (key > 2) {
      result += score[key] * key;
    }
  });
  return result;
};

const hasValue = (board, value) => {
  for (let i = 0; i < board.length; i++) {
    const val = board[i];
    for (let j = 0; j < val.length; j++) {
      if (val[j] === value) {
        return true;
      }
    }
  }
  return false;
};

export const isFull = (board) => {
  return !hasValue(board, 0);
};

const getRandomPosition = () => {
  const rowPosition = Math.floor(Math.random() * 4);
  const colPosition = Math.floor(Math.random() * 4);
  return [rowPosition, colPosition];
};

export const generateRandom = (board) => {
  if (isFull(board)) {
    return board;
  }

  let [row, col] = getRandomPosition();
  while (board[row][col] !== 0) {
    [row, col] = getRandomPosition();
  }

  board[row][col] = 2;
  return board;
};

export const moveLeftNew = (board) => {
  const newBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    const val = board[i];
    for (let j = 0; j < val.length; j++) {
      if (val[j] !== 0) {
        newBoard[i][j] = val[j];
      }
    }
  }
  return newBoard;
};

const compress = (board) => {
  const newBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    const val = board[i];
    let colIndex = 0;
    for (let j = 0; j < val.length; j++) {
      if (val[j] !== 0) {
        newBoard[i][colIndex] = val[j];
        colIndex++;
      }
    }
  }
  // printBoard(newBoard);
  return newBoard;
};

const merge = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length - 1; j++) {
      if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
        board[i][j] = board[i][j] * 2;
        board[i][j + 1] = 0;
      }
    }
  }
  return board;
}

export const moveLeft = (board) => {
  const newBoard1 = compress(board);
  const newBoard2 = merge(newBoard1);
  const newBoard3 = compress(newBoard2);
  const final = newBoard3;
  return final;
};

const reverse = (board) => {
  const reverseBoard = getEmptyBoard();

  for (let i = 0; i < board.length; i++) {
    const val = board[i];
    let colIndex = 0;
    for (let j = val.length - 1; j >= 0; j--) {
      reverseBoard[i][colIndex] = val[j];
      colIndex++;
    }
  }
  return reverseBoard;
};

export const moveRight = (board) => {
  const reversedBoard = reverse(board);
  const newBoard = moveLeft(reversedBoard);
  const final = reverse(newBoard);

  return final;
};

const rotateLeft = (board) => {
  const rotateBoard = getEmptyBoard();
  for (let i = 0; i < board.length; i++) {
    let colIndex = 0;
    for (let j = board[i].length - 1; j >= 0; j--) {
      rotateBoard[colIndex][i] = board[i][j];
      colIndex++;
    }
  }
  return rotateBoard;
};

const rotateRight = (board) => {
  const rotateBoard = getEmptyBoard();

  for (let i = 0; i < board.length; i++) {
    let colIndex = 0;
    for (let j = board.length - 1; j >= 0; j--) {
      rotateBoard[i][colIndex] = board[j][i];
      colIndex++;
    }
  }
  return rotateBoard;
};

export const moveUp = (board) => {
  const rotateBoard = rotateLeft(board);
  const newBoard = moveLeft(rotateBoard);
  const final = rotateRight(newBoard);
  return final;
};

export const moveDown = (board) => {
  const rotateBoard = rotateRight(board);
  const newBoard = moveLeft(rotateBoard);
  const final = rotateLeft(newBoard);
  return final;
};

export const checkWin = (board) => {
  return hasValue(board, 2048);
};

const hasDiff = (board, updatedBoard) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== updatedBoard[i][j]) {
        return true;
      }
    }
  }
  return false;
};

export const isOver = (board) => {
  if (hasDiff(board, moveLeft(board))) {
    return false;
  }
  if (hasDiff(board, moveRight(board))) {
    return false;
  }
  if (hasDiff(board, moveUp(board))) {
    return false;
  }
  if (hasDiff(board, moveDown(board))) {
    return false;
  }
  return true;
};

export const changed = (board, updatedBoard) => {
  return hasDiff(board, updatedBoard);
};
