const LightColors = {
  landingPage: {
    playTouchableOpacity: 'yellow',
  },
  loadingScreen: {
    container: 'white',
  },
  circleForGame: {
    commanChar: 'white',
    lettersCircle: '#E8C4A5',
  },
  theGame: {
    container: '#FFF2E1',
    levelDisplay: '#f8f8f8',
    wordBoxAnswers: 'blue',
    wordBoxText: '#f8f8f8',
    wordAttempt: '#CFF6FF',
    clearBox: '#f8f',
    giveUp: 'orange',
    newWord: 'yellow',
  },
  settingBar: {
    settingBar: '#f8f8f8',
    border: 'black',
  },
  settings: {
    container: '#FFF2E1',
    new: 'yellow',
  },
  levelDisplay: {
    // container: "#f8f8",
    title: '#66D3FA',
    wordEven: '#3C99DC',
    wordOdd: '#D5F3FE',
  },
  wordsCompleted: {
    container: '#FFF2E1',
    listContainer: 'yellow',
    answerBox: '#D5F3FE',
    answerText: 'red',
    answerForAnswerText: 'blue',
  },
  getMoreGiveUps: {
    container: '#FFF2E1',
    textInput: '#f8f8f8',
    giveUpLivesText: '#0d0',
    instructionsText: 'yellow',
    textInputGurmukhi: 'yellow',
    submitButton: '#ff641c',
    submitText: '#00035c',
  },
  modalNextWord: {
    container: 'white',
    wordBox: '#f8f8',
    continue: 'yellow',
  },
};

const DarkColors = {
  landingPage: {
    playTouchableOpacity: 'black',
  },
  loadingScreen: {
    container: '#6e7f80',
  },
  circleForGame: {
    commanChar: '#CDCDCD',
    lettersCircle: '#E8C4A5',
  },
  theGame: {
    container: '#5F909C',
    levelDisplay: '#f8f8f8',
    wordBoxAnswers: '#9C734F',
    wordBoxText: '#f8f8f8',
    wordAttempt: '#CFF6FF',
    clearBox: '#f8f',
    giveUp: '#ff7b00',
    newWord: 'yellow',
  },
  settingBar: {
    settingBar: '#f8f8',
    border: 'white',
  },
  settings: {
    container: '#5F909C',
    new: 'red',
  },
  levelDisplay: {
    // container: "#f8f8",
    title: '#66D3FA',
    wordEven: '#3C99DC',
    wordOdd: '#D5F3FE',
  },
  wordsCompleted: {
    container: '#5F909C',
    listContainer: 'yellow',
    answerBox: '#D5F3FE',
    answerText: 'red',
    answerForAnswerText: 'blue',
  },
  getMoreGiveUps: {
    container: '#5F909C',
    textInput: '#99e1f2',
    giveUpLivesText: '#0d0',
    instructionsText: '#99e1f2',
    textInputGurmukhi: '#99e1f2',
    submitButton: 'blue',
  },
  modalNextWord: {
    container: 'grey',
    wordBox: 'blue',
    continue: 'yellow',
  },
};

const theColors = {
  false: { ...LightColors },
  true: { ...DarkColors },
};

export default theColors;
