/* eslint-disable no-eval */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Animated, Dimensions } from "react-native";
import allWords from "../util/allWords";
import getWords from "../util/generateWords";
// import { fetchData } from './actions';

const setData = async (title, state) => {
  try {
    await AsyncStorage.setItem(title, JSON.stringify(state));
  } catch (e) {
    // console.log(e);
  }
};

// gets new words
// const setWords = (level, AllWords) => {
//   const [charArray, firstWord, secondWord] = getWords(level, AllWords);
//   return [charArray, firstWord, secondWord];
// };

// generate words for getMoreLives Page
const rotateAnimation = new Animated.Value(0);
const interpolateRotating = rotateAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "720deg"],
});
const screenWidth = Dimensions.get("window").width;

const wordsToType = [
  "vwihgurU",
  "DMn gurU nwnk dyv swihb jI",
  "DMn gurU AMgd dyv swihb jI",
  "DMn gurU Amrdws swihb jI",
  "DMn gurU rwmdws swihb jI",
  "DMn gurU Arjn dyv swihb jI",
  "DMn gurU hrgoibMd swihb jI",
  "DMn gurU hrrwie swihb jI",
  "DMn gurU hrikRSn swihb jI",
  "DMn gurU qyg bhwdr swihb jI",
  "DMn gurU goibMd isMG swihb jI",
  "DMn SRI gurU gRMQ swihb jI",
  "DMn gurU DMn gurU ipAwry",
];

const getRandomWord = () => {
  return wordsToType[Math.floor(Math.random() * wordsToType.length)];
};
// puts words for level 1
let generateWords = getWords(allWords.levels[1]);

const generateLevelProgress = () => {
  const levelProgress = [];
  const slicedWords = allWords.levels.slice(1);
  for (let i = 1; i <= slicedWords.length; i += 1) {
    levelProgress.push({
      level: i,
      wordsNeeded: 10,
      pointsPerWord: i + 5,
    });
  }
  return levelProgress;
};

export const initialState = {
  ALL_WORDS: allWords, // this list will not be changed
  usableWords: allWords.levels[1], // .filter((word) => word.level === 1),
  showIntroModal: false,
  // logic states for akharjor
  topWord: "",
  topHint: "",
  bottomWord: "",
  bottomHint: "",
  visited: [],
  attempt: "",
  animatedStyle: {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
    width: screenWidth,
    marginBottom: 25,
  },
  charArray: generateWords[0],
  firstWord: generateWords[1],
  firstLength: parseInt(generateWords[1].engText.length, 10),
  secondWord: generateWords[2],
  secondLength: parseInt(generateWords[2].engText.length, 10),
  correctWords: [],
  givenUpWords: [],
  giveUpsLeft: 100,
  nextLevelModal: [false],
  levelProgress: generateLevelProgress(),
  totalPoints: 0,
  // settings stuff
  typesOfWords: "Both",
  showPopUp: true,
  romanised: false,
  showNumOfLetters: true,
  includeMatra: true,
  // levels completed
  meaningPopup: false,
  // 2048 stuff
  resultShow: false,
  moves: 0,
  helpPage: true,
  helpPage2048: true,
  confetti: false,
  punjabiNums: true,
  // finalLevel
  finalLevel: allWords.levels.length,
};

// to reset all state
// setData('state', initialState);

function theGameReducer(state = initialState, action) {
  if (action.type === "FETCH_DATA") {
    return {
      ...state,
      ALL_WORDS: action.payload,
      finalLevel: action.payload.levels.length,
    };
  }
  if (action.type === "SET_DATA") {
    if (action.data.levels) {
      return {
        ...state,
        ALL_WORDS: action.data,
        finalLevel: action.data.levels.length,
      };
    }
  }
  if (action.type === "FETCH_LEVEL_PROGRESS") {
    let newProgress = [...action.payload];
    const lastLevel = state.levelProgress[0].level;
    const lastLevelProgress = state.levelProgress[0].wordsNeeded;
    newProgress = newProgress.slice(lastLevel - 1);
    newProgress[0].wordsNeeded = lastLevelProgress;
    return {
      ...state,
      levelProgress: newProgress,
    };
  }
  if (action.type === "SET_TOP_WORD") {
    const newState = {
      ...state,
      topWord: state.firstWord.engText,
      attempt: "",
      visited: [],
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_TOP_HINT") {
    const newState = {
      ...state,
      topHint: action.theTopHint,
      attempt: "",
      visited: [],
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_BOTTOM_WORD") {
    const newState = {
      ...state,
      bottomWord: state.secondWord.engText,
      attempt: "",
      visited: [],
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_BOTTOM_HINT") {
    const newState = {
      ...state,
      bottomHint: action.theBottomHint,
      attempt: "",
      visited: [],
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_ATTEMPT") {
    const newState = {
      ...state,
      attempt: action.theWord,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_CORRECT_WORDS") {
    let wordsLst = [...state.correctWords];

    // takes out duplicates from lst
    if (wordsLst.length !== 0) {
      wordsLst = wordsLst.filter((word) => word.engText !== action.theWord.engText);
    }
    wordsLst.push(action.theWord);
    const newState = {
      ...state,
      correctWords: wordsLst,
      totalPoints: state.totalPoints + state.levelProgress[0].pointsPerWord,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_GIVENUP_WORDS") {
    let wordsLst = [...state.givenUpWords];

    // takes out duplicates from lst
    if (wordsLst.length !== 0) {
      wordsLst = wordsLst.filter(
        (word) => word !== undefined && word.engText !== action.theWord.engText
      );
    }
    wordsLst.push(action.theWord);

    const newState = {
      ...state,
      givenUpWords: wordsLst,
    };
    setData("state", newState);
    return newState;
  }
  const getAllWords = () => {
    let result;
    if (
      state.levelProgress[0].wordsNeeded === 0 &&
      state.levelProgress[0].level === state.finalLevel - 1
    ) {
      result = [...state.ALL_WORDS.levels[1]];
    } else {
      result = state.ALL_WORDS.levels[state.levelProgress[0].level];
    }
    return result;
  };
  if (action.type === "SET_NEW_WORDS") {
    let newWordType = state.typesOfWords;

    let allWordsForCurrentLevel = getAllWords(newWordType);

    // if there are not enough words of 1 type in a level, the word type will go back to 'Both'
    if (allWordsForCurrentLevel.length < 3 && newWordType !== "Both") {
      newWordType = "Both";
      allWordsForCurrentLevel = getAllWords(newWordType);
    }

    const newUsableWords = allWordsForCurrentLevel.filter(
      (word) => !state.correctWords.includes(word) && !state.givenUpWords.includes(word)
    );

    let newGiveUpWords;
    if (newUsableWords.length > 3) {
      newGiveUpWords = [...state.givenUpWords];
    } else {
      newGiveUpWords = state.givenUpWords
        .map((word) => {
          if (word.level === state.levelProgress[0].level) {
            newGiveUpWords = allWordsForCurrentLevel.filter((cword) => !cword);
            newUsableWords.push(word);
            return null;
          }
          return word;
        })
        .filter(Boolean);
    }
    generateWords = getWords(newUsableWords);
    const condition =
      state.levelProgress[0].wordsNeeded === 0 &&
      state.levelProgress[0].level === state.finalLevel - 1;

    const newState = {
      ...state,
      nextLevelModal: [condition ? true : state.showPopUp, state.firstWord, state.secondWord],
      topWord: "",
      topHint: "",
      bottomWord: "",
      bottomHint: "",
      attempt: "",
      visited: [],
      charArray: generateWords[0],
      firstWord: generateWords[1],
      secondWord: generateWords[2],
      firstLength: parseInt(generateWords[1].engText.length, 10),
      secondLength: parseInt(generateWords[2].engText.length, 10),
      givenUpWords: newGiveUpWords,
      usableWords: newUsableWords,
      typesOfWords: newWordType,
      livesWord: getRandomWord(),
      confetti: false,
    };

    setData("state", newState);
    return newState;
  }
  if (action.type === "OPEN_NEXT_LEVEL_MODAL") {
    const newState = {
      ...state,
      nextLevelModal: [true, state.firstWord, state.secondWord],
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "CLOSE_NEXT_LEVEL_MODAL") {
    const newState = {
      ...state,
      nextLevelModal: [false],
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_LEVEL_PROGRESS") {
    let theLevelProgress = state.levelProgress;
    let newWordssNeeded = theLevelProgress[0].wordsNeeded;

    if (action.theWord.level === theLevelProgress[0].level) {
      if (newWordssNeeded > 0) {
        newWordssNeeded -= 1;
      }
    }
    theLevelProgress[0] = {
      ...theLevelProgress[0],
      wordsNeeded: newWordssNeeded,
    };
    if (newWordssNeeded === 0) {
      if (theLevelProgress.length !== 1) {
        theLevelProgress = theLevelProgress.slice(1);
      }
    }

    const newState = {
      ...state,
      levelProgress: theLevelProgress,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_THE_STATE") {
    // for async storage
    const newState = {
      ...action.state,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_TYPE_OF_WORDS") {
    const newState = {
      ...state,
      typesOfWords: action.theTypeOfWords,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_GIVE_UP_LIVES") {
    let newlives = 1;
    if (action.addOrSub === "+") {
      newlives = 3;
    }
    const newState = {
      ...state,
      giveUpsLeft: eval(`${state.giveUpsLeft} ${action.addOrSub} ${newlives}`),
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_SHOW_POP_UP") {
    const newState = {
      ...state,
      showPopUp: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_SHOW_ROMANISED") {
    const newState = {
      ...state,
      romanised: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "RESET_LEVELS") {
    const newState = {
      ...state,
      usableWords: state.ALL_WORDS.levels[0],
      finalLevel: state.ALL_WORDS.levels.length,
      topWord: "",
      topHint: "",
      bottomWord: "",
      bottomHint: "",
      attempt: "",
      visited: [],
      charArray: generateWords[0],
      firstWord: generateWords[1],
      firstLength: parseInt(generateWords[1].engText.length, 10),
      secondWord: generateWords[2],
      secondLength: parseInt(generateWords[2].engText.length, 10),
      correctWords: [],
      givenUpWords: [],
      giveUpsLeft: 100,
      nextLevelModal: [false],
      levelProgress: generateLevelProgress(),
      totalPoints: 0,
      // settings stuff
      typesOfWords: "Both",
      showPopUp: true,
      romanised: false,
      showNumOfLetters: true,
      includeMatra: true,
      // levels completed
      meaningPopup: false,
    };
    setData("state", newState);
    return newState;
  }

  // actions for 2048

  if (action.type === "2048_PUNJABI_NUMS") {
    const newState = {
      ...state,
      punjabiNums: action.theNums,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_RESULT_SHOW") {
    const newState = {
      ...state,
      resultShow: true,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "CLOSE_RESULT_MODAL") {
    const newState = {
      ...state,
      resultShow: false,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SHOW_MEANING_POPUP") {
    const newState = {
      ...state,
      meaningPopup: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_MOVING") {
    const newState = {
      ...state,
      moving: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "UPDATE_GRID") {
    const newState = {
      ...state,
      grid: action.theGrid,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_WON") {
    const newState = {
      ...state,
      won: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_OVER") {
    const newState = {
      ...state,
      over: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "KEEP_PLAYING") {
    const newState = {
      ...state,
      keepPlaying: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_SCORE") {
    const newState = {
      ...state,
      score: action.theScore,
    };

    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_BEST") {
    const newState = {
      ...state,
      best: action.theBest,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_TILES") {
    const newState = {
      ...state,
      tiles: action.theTiles,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_VISITED") {
    const newState = {
      ...state,
      visited: action.theVisited,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "OPEN_HELP_MODAL") {
    const newState = {
      ...state,
      helpPage: true,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "OPEN_2048_HELP_MODAL") {
    const newState = {
      ...state,
      helpPage2048: true,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "CLOSE_HELP_MODAL") {
    const newState = {
      ...state,
      helpPage: false,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "CLOSE_2048_HELP_MODAL") {
    const newState = {
      ...state,
      helpPage2048: false,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "CLOSE_INTRO_MODAL") {
    const newState = {
      ...state,
      showIntroModal: false,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SHOW_INTRO_MODAL") {
    const newState = {
      ...state,
      showIntroModal: true,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_CONFETTI") {
    return {
      ...state,
      confetti: action.onOrOff,
    };
    // setData("state", newState);
    // return newState;
  }

  if (action.type === "SET_WORDS") {
    const genWords = getWords(allWords.levels[state.levelProgress[0].level]);
    const newState = {
      ...state,
      allWords: action.theWords,
      usableWords: allWords.levels[state.levelProgress[0].level],
      charArray: genWords[0],
      firstWord: genWords[1],
      firstLength: parseInt(genWords[1].engText.length, 10),
      secondWord: genWords[2],
      secondLength: parseInt(genWords[2].engText.length, 10),
    };
    setData("state", newState);
    return newState;
  }

  // sample for action.type handler
  // if (action.type === "") {
  //   const newState = {
  //   };
  //   setData("state", newState);
  //   return newState;
  // }

  // default
  return { ...state };
}

export default theGameReducer;
