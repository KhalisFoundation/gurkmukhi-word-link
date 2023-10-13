import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Anvaad from 'anvaad-js';
import AnimatedLottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions, Platform, Share } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';

import GameBoard from './components/gameBoard';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import {
  setCurrentGuessIndex,
  setGameWon,
  setSolution,
  setGuesses,
  setUsedKeys,
  setGameEnded,
  setWrongGuessShake,
  setGameStarted,
  setGameLanguage,
  setHelpModal,
} from '../../store/slices/gameStateSlice';
import { guess, matchStatus } from '../../types';
import { colors, HEIGHT, initialGuesses, maatras, SIZE } from '../../utils/constants';
import { demo } from '../../words';
import * as PlatformCheck from '../../../../util/orientation';
import Help from '../help';

const Game = ({ navigation }) => {
  const {
    guesses,
    usedKeys,
    currentGuessIndex,
    gameStarted,
    gameEnded,
    gameWon,
    solution,
    helpModalOpen,
  } = useAppSelector((state) => state.gameState);
  // const solution = "ਸਿਪਾਹੀ";
  const dispatch = useAppDispatch();
  (async () => {
    const gameLanguage = 'pn';
    dispatch(setGameLanguage(gameLanguage));
  })();

  const [fontsLoaded] = useFonts({
    Muli: require('../../../../assets/fonts/Muli.ttf'),
    GurbaniHeavy: require('../../../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../../../assets/fonts/Mochy.ttf'),
    Prabhki: require('../../../../assets/fonts/Prabhki.ttf')
  });

  const lottieRef = useRef<AnimatedLottieView>(null);

  const [localState, setLocalState] = useState({
    orientation: PlatformCheck.isPortrait() ? 'portrait' : 'landscape',
    devicetype: PlatformCheck.isTablet() ? 'tablet' : 'phone'
  });

  // Event Listener for orientation changes
  const [screen, setScreen] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  });

  let dimeMin = Math.min(screen.width, screen.height);
  Dimensions.addEventListener('change', () => {
    dimeMin = Math.min(screen.width, screen.height);
    setScreen({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    });
    setLocalState({
      orientation: PlatformCheck.isPortrait() ? 'portrait' : 'landscape',
      devicetype: PlatformCheck.isTablet() ? 'tablet' : 'phone'
    });
  });

  const answers = () => {
    return demo;
  };

  const handleFoundKeysOnKeyboard = (guess: guess) => {
    const tempUsedKeys = { ...usedKeys };
    guess.letters.forEach((letter: string, idx: number) => {
      //check if any element from maatras in letter
      let akhar = letter;
      if (letter.length>1) {
        akhar = removeMaatra(letter);
      }
      const keyValue = tempUsedKeys[akhar];
      if (!keyValue) {
        // eslint-disable-next-line
        // @ts-ignore
        tempUsedKeys[akhar] = guess.matches[idx];
      } else {
        if (keyValue === 'correct') return;
        else if (keyValue && guess.matches[idx] === 'correct') {
          tempUsedKeys[akhar] = 'correct';
        } else if (keyValue === 'present' && guess.matches[idx] !== 'correct')
          return;
        // eslint-disable-next-line
        // @ts-ignore
        else tempUsedKeys[akhar] = guess.matches[idx];
      }
    });
    dispatch(setUsedKeys(tempUsedKeys));
  };

  const resetGameState = () => {
    dispatch(setGuesses([...initialGuesses]));
  };

  const resetGame = () => {
    lottieRef.current?.reset();
    dispatch(setGameStarted(true));
    resetGameState();
    dispatch(setCurrentGuessIndex(0));
    dispatch(setUsedKeys([]));
    dispatch(setGameWon(false));
    dispatch(setGameEnded(false));
    dispatch(
      setSolution(answers()[Math.floor(Math.random() * answers().length)])
    );
  };


  const share = () => {
    Share.share({
      message: `Hi! I'm playing Punjabi Wordle on Akhar Games to learn Gurmukhi. Join me!
      \nhttps://play.google.com/store/apps/details?id=com.khalisfoundation.gurmukhi_games`,
      title: "Akhar Games is a collection of games to help you learn Gurmukhi. Play now!"
    }, {
      dialogTitle: "Share Akhar Games"
    });
  }

  const updateGuess = (keyPressed: string, currentGuess: guess) => {
    const currentGuessLetters = [...currentGuess.letters];
    let nextEmptyIndex = currentGuessLetters.findIndex(
      (letter) => letter === '' || maatras.includes(letter)
    );
    if (nextEmptyIndex === -1) nextEmptyIndex = solution.punjabiText.length;
    const lastNonEmptyIndex = nextEmptyIndex - 1;
    if (keyPressed !== '<' && keyPressed !== 'Enter' && keyPressed !== 'Reset' && nextEmptyIndex < solution.punjabiText.length) {
      if (currentGuessLetters[nextEmptyIndex] && currentGuessLetters[nextEmptyIndex] !== "") {
        let currentGuess = currentGuessLetters[nextEmptyIndex] as string;
        if (maatras.includes(currentGuess)) {
          currentGuessLetters[nextEmptyIndex] = keyPressed + currentGuessLetters[nextEmptyIndex];
        }
      } else {
        currentGuessLetters[nextEmptyIndex] = keyPressed;
      }
      const updatedGuess = { ...currentGuess, letters: currentGuessLetters };
      const updatedGuesses = guesses.map((guess, idx) => {
        if (idx === currentGuessIndex) return updatedGuess;
        else return guess;
      });
      dispatch(setGuesses([...updatedGuesses]));
    } else if (keyPressed === '<') {
      const updatedGuessLetters = lastAkharRemover(currentGuessLetters);
      const updatedGuess = { ...currentGuess, letters: updatedGuessLetters };
      const updatedGuesses = guesses.map((guess, idx) => {
        if (idx === currentGuessIndex) return updatedGuess;
        else return guess;
      });
      dispatch(setGuesses([...updatedGuesses]));
    } else if (keyPressed === 'Reset' && !currentGuess.isComplete) {
      resetGame();
    }
  };

  const lastAkharRemover = (arr: string[]) => {
    if (numAkhar(arr) === 0) {
      return arr;
    } else {
      let newArr = [...arr];
      let nextEmptyIndex = newArr.findIndex(
        (letter) => letter === '' || maatras.includes(letter)
      );
      if (nextEmptyIndex === -1) nextEmptyIndex = arr.length;
      const lastNonEmptyIndex = nextEmptyIndex - 1;
      const lastAkhar = newArr[lastNonEmptyIndex];
      const lastAkharSplit = lastAkhar.split("").length <= 1 ? [lastAkhar] : lastAkhar.split("");
      const maatrasInLastAkhar = lastAkharSplit.filter(value => maatras.includes(value));
      if (maatrasInLastAkhar.length === 0) {
        newArr[lastNonEmptyIndex] = '';
      } else {
        newArr[lastNonEmptyIndex] = (lastAkharSplit.length > 1) ? lastAkharSplit[1] : "";
      }
      return newArr;
    }
  }

  const removeAkhar = (text: string) => {
    let newText = text;
    maatras.forEach((maatra) => {
      const akhar = newText.replace(maatra, "");
      newText = newText.replace(akhar,"");
    });
    return newText;
  }

  const removeMaatra = (text: string) => {
    let newText = text;
    maatras.forEach((maatra) => {
      newText = newText.replace(maatra, "");
    });
    return newText;
  }

  const numAkhar = (arr: string[]) => {
    let newArr = [];
    arr.forEach((ele, idx) => {
      const splited = ele.split("").length <= 1 ? [ele] : ele.split("");
      //remove "" elements from splited
      const difference = splited.filter(x => x!=="" && !maatras.includes(x));
      if (difference.length > 0) {
        newArr.push(difference[0]);
      }
    });
    return newArr.length;
  };

  const divByMatra = (text: string) => {
    let word = text;
    let newWord = '';
    // while loop for the following logic
    // if the word has a matra, then split the word at the matra and add a space after the matra
    // if the word does not have a matra, then add a space after the word
    while (word.length > 0) {
      if (maatras.includes(word[0])) {
        newWord += word[0];
        if (word.length > 1 && maatras.includes(word[1])) {
          newWord += word[1];
          word = word.slice(1);
        }
        if (word[0] !== 'i') {
          newWord += ',';
        }
      } else {
        newWord += word[0];
        if (word.length > 1 && (!maatras.includes(word[1]) || word[1] === 'i')) {
          newWord += ',';
        }
      }
      word = word.slice(1);
    }
    if (newWord[newWord.length - 1] === ',') {
      newWord = newWord.slice(0, -1);
    }
    newWord = newWord.replace(',undefined', '');
    return newWord.split(',');
  }

  const compare = (guessed: string, solution: string) => {
    let result = [];
    
    let guessedArr = divByMatra(guessed);
    let solutionArr = divByMatra(solution);
    // create dictionary of solutionArr
    let solutionDict = {};
    for (let i = 0; i < solutionArr.length; i++) {
      let ele = removeMaatra(solutionArr[i]);
      if (solutionDict[ele]) {
        solutionDict[ele] += 1;
      } else {
        solutionDict[ele] = 1;
      }
    }

    for (let i = 0; i < guessedArr.length; i++) {
      if (guessedArr[i] === solutionArr[i]) {
        result.push("correct");
        solutionDict[removeMaatra(guessedArr[i])] -= 1;
      } else if (solution.includes(removeMaatra(guessedArr[i]))) {
        if (solutionDict[removeMaatra(guessedArr[i])] > 0) {
          result.push("present");
          solutionDict[removeMaatra(guessedArr[i])] -= 1;
        } else {
          result.push("absent");
        }
      } else {
        result.push("absent");
      }
    }
    return result
  }

  const checkGuess = (currentGuess: guess) => {
    let currentGuessedWord = divByMatra(currentGuess.letters.join(''));
    let solutionLength = divByMatra(solution.punjabiText).length;
    let letters = currentGuess.letters.join('');
    let matches: matchStatus[] = compare(letters, solution.punjabiText);
    if (currentGuessedWord.length === solutionLength) {
      // currentGuessedWord = divByMatra(currentGuessedWord)
      // solutionLength = divByMatra(solution).length;
      if (currentGuessedWord.join('') === solution.punjabiText) {
        const matches: matchStatus[] = Array(solutionLength).fill("correct");
        const updatedGuess = {
          ...currentGuess,
          matches,
          isComplete: true,
          isCorrect: true,
        };
        const updatedGuesses = guesses.map((guess, idx) => {
          if (idx === currentGuessIndex) return updatedGuess;
          else return guess;
        });
        dispatch(setGuesses(updatedGuesses));
        setTimeout(() => {
          lottieRef.current?.play();
          dispatch(setGameWon(true));
          dispatch(setGameEnded(true));
          handleFoundKeysOnKeyboard(updatedGuess);
        }, 250 * 6);
      } else {
        const updatedGuess = {
          ...currentGuess,
          matches,
          isComplete: true,
          isCorrect: false,
        };

        const updatedGuesses = guesses.map((guess, idx) => {
          if (idx === currentGuessIndex) return updatedGuess;
          else return guess;
        });

        dispatch(setGuesses(updatedGuesses));
        dispatch(setCurrentGuessIndex(currentGuessIndex + 1));
        handleFoundKeysOnKeyboard(updatedGuess);
      }
    } else {
      dispatch(setWrongGuessShake(true));
      setTimeout(() => {
        dispatch(setWrongGuessShake(false));
      }, 1000);
    }
  };

  const handleGuess = (keyPressed: string) => {
    if (!gameEnded) {
      const currentGuess = guesses[currentGuessIndex];
      if (currentGuess) {
        if (keyPressed !== 'Enter' && !currentGuess.isComplete) {
          updateGuess(keyPressed, currentGuess);
        } else if (keyPressed === 'Enter' && !gameWon) {
          checkGuess(currentGuess);
        }
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 10,
      paddingHorizontal: 20,
      backgroundColor: colors.bg
    },
    lottieContainer: {
      width: SIZE,
      height: screen.height,
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'transparent',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      height: dimeMin * 0.175,
      paddingHorizontal: 5,
      marginTop: 5,
      backgroundColor: 'transparent',
      // paddingHorizontal: 20,
    },
    newGameScreen: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: colors.bg
    },
  });

  if (!gameStarted)
    return (
      <SafeAreaView style={styles.newGameScreen}>
        { helpModalOpen ? <Help /> : null }
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <IonIcons name="chevron-back" size={dimeMin * 0.07} color="#f5f5f7" style={{elevation: 5, alignSelf: 'center'}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { dispatch(setHelpModal(true)); }}
          >
            <IonIcons name="help" size={dimeMin * 0.07} color="#f5f5f7" style={{elevation: 5, alignSelf: 'center'}}/>
          </TouchableOpacity>
        </View>
        <View style={{height: '80%', width: screen.width, alignItems: 'center', justifyContent: 'space-evenly'}}>
          <View style={{alignItems: 'center', width: '100%'}}>
            <Image source={require('../../../../assets/wordle.png')} style={{width: dimeMin, height: dimeMin * 0.2, resizeMode: 'contain', marginBottom: 10}} />
            <Text style={{ color: colors.white, fontSize:  dimeMin * 0.07, fontFamily: 'Muli' }}>
              {Platform.OS == 'ios' ? 'Shabadle' :'Punjabi Wordle' }
            </Text>
          </View>
          <TouchableOpacity onPress={resetGame} style={{
            width: '40%',
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 15,
            elevation: 5,
            backgroundColor: '#FF7E00',
            borderColor: colors.keyDefault, borderWidth: 0.5
          }}>
            <Text style={{
              fontFamily: 'Muli',
              textAlign: 'center',
              color: colors.keyDefault,
              fontSize: dimeMin * 0.05,
              marginVertical: 10,
            }}>Start game</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
    return (
      <SafeAreaView style={styles.container} >
      { helpModalOpen ? <Help /> : null }
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <IonIcons name="chevron-back" size={dimeMin * 0.07} color="#f5f5f7" style={{elevation: 5, alignSelf: 'center'}} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            onPress={() => { dispatch(setHelpModal(true)); }}
          >
            <IonIcons name="help" size={dimeMin * 0.07} color="#f5f5f7" style={{elevation: 5, alignSelf: 'center'}}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { share(); }}
          >
            <IonIcons name="share-social-outline" size={dimeMin * 0.07} color="#f5f5f7" style={{elevation: 5, alignSelf: 'center'}}/>
          </TouchableOpacity>
        </View>
      </View>
      <GameBoard
        solution={solution}
        handleGuess={handleGuess}
        resetGame={resetGame}
      />
    </SafeAreaView>
  );
}

export default Game;
