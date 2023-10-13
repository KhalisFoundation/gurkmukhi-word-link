import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getGuess } from '../../utils/getGuess';
import { guess, matchingUsedKey } from '../../types';
// import { initialGuesses } from '../../utils/constants';

interface gameState {
  solution: any;
  guesses: guess[];
  currentGuessIndex: number;
  usedKeys: matchingUsedKey;
  gameStarted: boolean;
  gameEnded: boolean;
  gameWon: boolean;
  wrongGuessShake: boolean;
  gameLanguage: string;
  helpModalOpen: boolean;
}

const initialState: gameState = {
  solution: {},
  guesses: [], // to reset number of guesses
  currentGuessIndex: 0,
  usedKeys: {},
  gameStarted: false,
  gameEnded: false,
  gameWon: false,
  wrongGuessShake: false,
  gameLanguage: 'pn',
  helpModalOpen: false,
};

// const getGuess = (solution: string, id: number) => {
//   return [{
//     id,
//     letters: Array(solution.split("").length).fill(""),
//     matches: Array(solution.split("").length).fill(""),
//     isComplete: false,
//     isCorrect: false,
//   }];
// }


export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setSolution: (state, action) => {
      state.solution = action.payload;
      if (state.guesses.length == 0 ) {
        state.guesses = state.guesses.concat(getGuess(state.solution.punjabiText,0))
      }
    },
    setGuesses: (state, action) => {
      state.guesses = action.payload;
    },
    setCurrentGuessIndex: (state, action) => {
      state.currentGuessIndex = action.payload;
      if (state.guesses.length != 0 && state.guesses.length == state.currentGuessIndex) {
        state.guesses = state.guesses.concat(getGuess(state.solution.punjabiText,state.guesses.length))
      }
    },
    setUsedKeys: (state, action) => {
      state.usedKeys = action.payload;
    },
    setGameStarted: (state, action) => {
      state.gameStarted = action.payload;
    },
    setGameEnded: (state, action) => {
      state.gameEnded = action.payload;
    },
    setGameWon: (state, action) => {
      state.gameWon = action.payload;
    },
    setWrongGuessShake: (state, action) => {
      state.wrongGuessShake = action.payload;
    },
    setGameLanguage: (state, action) => {
      state.gameLanguage = action.payload;
    },
    setHelpModal: (state, action) => {
      state.helpModalOpen = action.payload;
    },
  },
});

export const {
  setSolution,
  setGuesses,
  setCurrentGuessIndex,
  setUsedKeys,
  setGameStarted,
  setGameEnded,
  setGameWon,
  setWrongGuessShake,
  setGameLanguage,
  setHelpModal
} = gameStateSlice.actions;

export const gameState = (state: RootState) => state.gameState;

export default gameStateSlice.reducer;
