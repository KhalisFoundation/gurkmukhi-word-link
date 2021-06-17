/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import TheCircle from './circleForGame';

function GameScreen({ navigation }) {
  const words = [
    { text: 'ਅਜ', meaning: 'Today' },
    { text: 'ਜਲ', meaning: 'Water' },
    { text: 'ਧਰਮ', meaning: 'Religion' },
    { text: 'ਮਾਮਾ', meaning: "Mum's Brother" },
    { text: 'ਚਲਾਕ', meaning: 'Clever' },
    { text: 'ਕਪੜਾ', meaning: 'Cloth' },
    { text: 'ਪਰਵਾਰ', meaning: 'Family' },
  ];
  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
  const characters = [];
  // First word
  const firstWord = getRandomWord();
  // Second Word
  let secondWord = getRandomWord();
  while (firstWord === secondWord) {
    secondWord = getRandomWord();
  }

  for (let i = 0; i < firstWord.text.length; i += 1) {
    const theChar = firstWord.text.charAt(i);
    if (!characters.includes(theChar)) {
      characters.push(theChar);
    }
  }
  for (let i = 0; i < secondWord.text.length; i += 1) {
    const theChar = secondWord.text.charAt(i);
    if (!characters.includes(theChar)) {
      characters.push(theChar);
    }
  }

  return (
    <View style={styles.container}>
      {/* BackButton */}
      <TouchableOpacity
        style={styles.backButton}
        title="Home"
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Image
          source={require('../images/left_arrow.png')}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      <Text style={styles.title}>ਅਖਰ ਜੋੜੋ </Text>
      <View style={styles.wordBoxAnswers}>
        <View style={styles.wordBoxText1}>
          <Text style={styles.answers}>Hi</Text>
        </View>
        <View style={styles.wordBoxText2}>
          <Text style={styles.answers}>Hi</Text>
        </View>
      </View>
      <View style={styles.wordAttempt}>
        <Text>
          {firstWord.text}
          :
          {firstWord.meaning}
        </Text>
        <Text>
          {secondWord.text}
          :
          {secondWord.meaning}
        </Text>
      </View>
      <TheCircle characters={characters} />
      {/* there can only be from 4-18 characters as input */}
    </View>
  );
}

// TODO - Move all colors to separate file and import as variables.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#5F909C',
    paddingTop: '9%',
  },
  backButton: {
    width: '10%',
    height: '7%',
    right: '40%',
  },
  backArrow: {
    width: '90%',
    height: '90%',
  },
  title: {
    fontSize: 60,
    bottom: '10%',
  },
  wordBoxAnswers: {
    bottom: 65,
    width: 350,
    height: 250,
    backgroundColor: '#9C734F',
    borderRadius: 20,
  },
  wordBoxText1: {
    width: 250,
    height: 50,
    left: 50,
    top: 30,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  wordBoxText2: {
    width: 250,
    height: 50,
    left: 50,
    top: 60,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  answers: {
    fontSize: 35,
    left: 10,
  },
  wordAttempt: {
    bottom: 58,
    width: 200,
    height: 50,
    backgroundColor: '#CFF6FF',
    // borderRadius: 20,
  },
});

export default GameScreen;