/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */
import AsyncStorage from "@react-native-async-storage/async-storage";

class LocalStorageManager {
  bestScoreKey = "bestScore";

  gameStateKey = "gameState";

  getItem(options) {
    AsyncStorage.getItem(options.key, (error, result) => {
      if (error) {
        options.error(error);
      } else {
        options.success(result);
      }
    });
  }

  setItem(options) {
    AsyncStorage.setItem(options.key, options.value, (error, result) => {
      if (error) {
        options.error(error);
      } else {
        options.success(result);
      }
    });
  }

  removeItem(options) {
    AsyncStorage.removeItem(options.key, (error, result) => {
      if (error) {
        options.error(error);
      } else {
        options.success(result);
      }
    });
  }

  getBestScore(callback = () => {}) {
    this.getItem({
      key: this.bestScoreKey,
      success: (result) => {
        callback(result && !isNaN(result) ? parseInt(result, 10) : 0);
      },
      // error: (error) => {
      //   // console.log(error);
      // },
    });
  }

  setBestScore(score, callback = () => {}) {
    this.setItem({
      key: this.bestScoreKey,
      value: score.toString(),
      success: callback,
    });
  }

  getGameState(callback) {
    return this.getItem({
      key: this.gameStateKey,
      success: (result) => {
        const state = result ? JSON.parse(result) : null;
        callback(state);
      },
    });
  }

  setGameState(gameState, callback = () => {}) {
    const json = gameState ? JSON.stringify(gameState) : null;
    this.setItem({
      key: this.gameStateKey,
      value: json,
      success: callback,
    });
  }

  clearGameState(callback = () => {}) {
    this.removeItem({
      key: this.gameStateKey,
      success: callback,
    });
  }
}

export default LocalStorageManager;
