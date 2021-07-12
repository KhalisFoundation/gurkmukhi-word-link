/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import * as Anvaad from 'anvaad-js';
import {
  View, Text, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TheCircle from './circleForGame';

import {
  setTopWord,
  setBottomWord,
  setAttempt,
  setNewWords,
  setGivenUpWords,
} from '../../redux/actions';

import theColors from '../../util/colors';

function GameScreen({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();

  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.theGame.container,
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
    levelDisplay: {
      backgroundColor: colors.theGame.levelDisplay,
      bottom: '10%',
      left: '20%',
    },
    wordBoxAnswers: {
      bottom: 65,
      width: 350,
      height: 250,
      backgroundColor: colors.theGame.wordBoxAnswers,
      borderRadius: 20,
    },
    hint: {
      width: 60,
      top: 60,
    },
    wordBoxText: {
      width: 250,
      height: 50,
      left: 50,
      top: 30,
      backgroundColor: colors.theGame.wordBoxText,
      borderRadius: 20,
    },
    answers: {
      fontSize: 35,
      left: 10,
    },
    wordAttemptView: {
      flexDirection: 'row',
    },
    wordAttempt: {
      bottom: 58,
      width: 200,
      height: 50,
      backgroundColor: colors.theGame.wordAttempt,
      borderRadius: 20,
      paddingLeft: 20,
      fontSize: 30,
    },
    clearBox: {
      width: 50,
      height: 30,
      backgroundColor: colors.theGame.clearBox,
      top: -50,
      left: 5,
      borderRadius: 20,
    },
    giveUp: {
      backgroundColor: colors.theGame.giveUp,
      width: 50,
      height: 50,
      borderRadius: 25,
      left: 300,
      top: -20,
    },
    giveUpTxt: {
      textAlign: 'center',
    },
    newWord: {
      left: 265,
      borderRadius: 20,
      width: 90,
      backgroundColor: colors.theGame.newWord,
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {/* BackButton */}
      <TouchableOpacity
        style={styles.backButton}
        title="Home"
        onPress={() => {
          navigation.navigate('Home', { correctWords: state.correctWords });
        }}
      >
        <Image
          source={require('../../images/left_arrow.png')}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      <Text style={styles.title}>ਅਖਰ ਜੋੜੋ </Text>
      <View style={styles.levelDisplay}>
        <Text>
          Current Level:
          {state.levelProgress[0].level}
        </Text>
        <Text>
          Words Needed for next level:
          {' '}
          {state.levelProgress[0].wordsNeeded}
        </Text>
      </View>
      <View style={styles.wordBoxAnswers}>
        <Text style={styles.hint}>
          {`Len: ${state.firstWord.engText.length}`}
        </Text>
        <View style={styles.wordBoxText}>
          <Text style={styles.answers}>{Anvaad.unicode(state.topWord)}</Text>
          <View style={styles.definition}>
            <Text style={styles.definitionText}>{state.firstWord.meaning}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.giveUp}
          onPress={() => {
            dispatch(setTopWord());
            dispatch(setGivenUpWords(state.firstWord));
            if (state.bottomWord !== '') {
              setTimeout(() => dispatch(setNewWords()), 1000);
            }
          }}
        >
          <Text style={styles.giveUpTxt}>GIVE UP</Text>
        </TouchableOpacity>
        <Text style={styles.hint}>
          {`Len: ${state.secondWord.engText.length}`}
        </Text>
        <View style={styles.wordBoxText}>
          <Text style={styles.answers}>{Anvaad.unicode(state.bottomWord)}</Text>
          <View style={styles.definition}>
            <Text style={styles.definitionText}>
              {state.secondWord.meaning}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.giveUp}
          onPress={() => {
            dispatch(setBottomWord());
            dispatch(setGivenUpWords(state.secondWord));
            if (state.topWord !== '') {
              setTimeout(() => dispatch(setNewWords()), 1000);
            }
          }}
        >
          <Text style={styles.giveUpTxt}>GIVE UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.newWord}
          title="New Words"
          onPress={() => {
            dispatch(setNewWords());
          }}
        >
          <Text>New Word</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.wordAttemptView}>
        <Text style={styles.wordAttempt} placeHolder="Word">
          {Anvaad.unicode(state.attempt)}
        </Text>
        <TouchableOpacity
          style={styles.clearBox}
          onPress={() => {
            dispatch(setAttempt(''));
          }}
        >
          <Text style={styles.clearBoxText}>CLEAR</Text>
        </TouchableOpacity>
      </View>

      <TheCircle
        charArray={state.charArray}
        // setAttempt={actions.setAttempt}
        dispatch={dispatch}
        state={state}
      />
      {/* there can only be from 4-18 characters as input */}
    </View>
  );
}

export default GameScreen;
