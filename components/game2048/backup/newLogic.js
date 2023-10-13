/* eslint-disable */
const tile = (i, val, pos) => {
  return {
    id: i,
    value: val,
    position: pos
  };
};

const tileCount = 4;
const positionToIndex = (position) => {
  return position[1] * tileCount + position[0];
};
const indexToPosition = (index) => {
  const x = index % tileCount;
  const y = Math.floor(index / tileCount);
  return [x, y];
};

export const getEmptyBoard = () => {
  const board = [];
  const list = Array.from(Array(4), (x, i) => i);
  for (i in list) {
    for (j in list) {
      const id = (parseInt(i) * 4) + parseInt(j);
      board.push(tile(id, 2, [parseInt(i), parseInt(j)]));
    }
  }
  return board;
};

export const printBoard = (board) => {
  console.log('++++++');
  for (i in [0, 1, 2, 3]) {
    let row = '';
    for (j in [0, 1, 2, 3]) {
      row += `${board[parseInt(i) * 4 + parseInt(j)].value}, `;
    }
    console.log(row);
  }
  console.log('++++++');
};

const hasValue = (board, value) => {
  board.forEach((element) => {
    if (element.value === value) {
      return true;
    }
  });
  return false;
};

export const isFull = (board) => {
  return !hasValue(board, 0);
};

export const retrieveTileMap = (idList, tiles) => {
  const tileMap = new Array(tileCount * tileCount).fill(0);
  idList.forEach((id) => {
    const { position } = tiles[id];
    const index = positionToIndex(position);
    tileMap[index] = id;
  });
  return tileMap;
};

export const findEmptyTiles = (idList, tiles) => {
  const tileMap = retrieveTileMap(idList, tiles);
  const emptyTiles = tileMap.reduce((result, tileId, index) => {
    if (tileId === 0) {
      return [...result, indexToPosition(index)];
    }
    return result;
  }, []);
  return emptyTiles;
};

const generateRandomTile = () => {
  const emptyTiles = findEmptyTiles();
  if (emptyTiles.length > 0) {
    const index = Math.floor(Math.random() * emptyTiles.length);
    const position = emptyTiles[index];
    createATile({ position, value: 2 });
  }
};
