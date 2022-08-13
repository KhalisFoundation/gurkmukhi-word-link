import * as React from 'react';
import {
    View, TouchableOpacity, StyleSheet, Text, ScrollView, Animated, Dimensions
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import * as Anvaad from 'anvaad-js';
import * as Analytics from 'expo-firebase-analytics';
import { HintButton } from '.';
import { setBottomHint, setGivenUpWords, setNewWords, setTopHint, setTopWord, setCorrectWords, setLevelProgress, setBottomWord, setAttempt, setGiveUpLives } from './../../redux/actions';


export const WordBox = ({ wordType }) => {
    const state = useSelector((theState) => theState.theGameReducer);
    const dispatch = useDispatch();
    const screenWidth = Dimensions.get('window').width;
    
    // animations
    const rotateAnimation = useRef(new Animated.Value(0)).current;
    
    const handleAnimation = () => {
        Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        }).start(() => {
        rotateAnimation.setValue(0);
        });
    };
    
    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg'],
    });
    
    const animatedStyle = {
        transform: [
        {
            rotate: interpolateRotating,
        },
        ],
        width: screenWidth,
        marginBottom: 25
    };
    let word = state.attempt;
    if (word === state.firstWord.engText && state.topWord === '') {
        handleAnimation();
        if (!state.correctWords.includes(state.firstWord)) {
        dispatch(setTopWord());
        dispatch(setCorrectWords(state.firstWord));
        dispatch(setLevelProgress(state.firstWord));
        }
        // if bottomWord is filled that means both are now answered so will get new words
        if (state.bottomWord !== '') {
        dispatch(setNewWords());
        }
    }
    if (word === state.secondWord.engText && state.bottomWord === '') {
        handleAnimation();
        if (!state.correctWords.includes(state.secondWord)) {
        dispatch(setBottomWord());
        dispatch(setCorrectWords(state.secondWord));
        dispatch(setLevelProgress(state.secondWord));
        }
        // if topWord is filled that means both are now answered so will get new words
        if (state.topWord !== '') {
        dispatch(setNewWords());
        }
    };

    const styles = StyleSheet.create({
        answerText: {
          textAlign: 'center',
          color: state.darkMode ? 'white' : 'black',
          fontSize: 35,
          borderRadius: 25,
          height: 50,
        },
        answerTouchOpacity: {
          justifyContent: 'center',
          paddingTop: 10,
          height: 50,
          width: "100%",
          marginBottom: 10,
        },
        definitionText: {
          fontFamily: 'Muli',
          fontSize: 16,
          marginBottom: 5,
          textShadowColor: (state.darkMode) ? 'white' : 'black',
          textShadowOffset: {
            width: 0.5,
            height: 0.5
          },
          textShadowRadius: 1,
          color: (state.darkMode) ? 'white' : 'black',
        },
        giveUp: {
          marginRight: 5,
          marginTop: 5,
          alignSelf: 'center',
          backgroundColor: state.darkMode ? "#ff7b00" : "orange",
          opacity: 1,
          width: 40,
          height: 40,
          borderColor: state.darkMode ? 'white' : 'black',
          borderWidth: 2,
          borderRadius: 20,
        },
        giveUpTxt: {
          textAlign: 'center',
          alignItems: 'center',
          fontSize: (state.giveUpsLeft === 0 || state.topWord !== '') ? 30 : 35,
          width: '100%',
          height: '100%',
        },
    
    });

    const func = (what) => {
        if (what === 'top') {
            return ((state.topWord === '') ? state.topHint : state.topWord);
        }
        return ((state.bottomWord === '') ? state.bottomHint : state.bottomWord);
    };
    
      // find out how divByMatra should work
      const matras = ['w', 'i', 'I', 'u', 'U', 'y', 'Y', 'o', 'O', 'M', 'N', '`', '~'];
      const divByMatra = (word) => {
        let newWord = '';
        for (let i = 0; i < (word.length); i += 1) {
          // newWord += `,${word[i]}${word[i+1]}`;
          if (word[i + 1] === 'æ') {
            newWord += `${word[i]}${word[i + 1]},`;
            i += 1;
          }
          if (!matras.includes(word[i])) {
            if (i + 1 !== word.length && matras.includes(word[i + 1]) && word[i + 1] !== 'i') {
              newWord += `${word[i]}${word[i + 1]},`;
              i += 1;
            } else if (word[i - 1] === 'i') {
              newWord += `${word[i - 1]}${word[i]},`;
            } else {
              newWord += `${word[i]},`;
            }
          }
        }
        newWord = newWord.slice(0, -1);
        // console.log(newWord); prints out comma separated word with matras
        return newWord.split(',');
      };
    
      const awayOrTogether = (which) => {
        let printed = '';
        if (which === 'top') {
          printed = (state.topWord === '') ? state.topHint : state.topWord;
        } else {
          printed = (state.bottomWord === '') ? state.bottomHint : state.bottomWord;
        }
        if (state.includeMatra) {
          printed = divByMatra(printed);
        }
        if (state.showNumOfLetters) {
          let newArray = state.includeMatra ? 
            divByMatra((which === 'top') ? state.firstWord.engText : state.secondWord.engText)
          : Array((which === 'top') ? state.firstWord.engText.length : state.secondWord.engText.length);
          let numOfLetters = newArray.length;
          let fontsize = (numOfLetters > 5) ? 25 : 35;
          let newsize = (numOfLetters > 5) ? 40 : 50;
          return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {Array.from(newArray , (e, i) => {
                return (
                  <Text style={{ ...styles.answerText, borderRadius: 50, backgroundColor: '#fff', width: newsize, height: newsize, fontSize: fontsize }} >
                    {Anvaad.unicode(printed[i])}
                  </Text>
                );
              })}
            </View>
          );
        }
        return (
          <Text style={{ ...styles.answerText, width: '95%', backgroundColor: 'transparent'}}>
            {Anvaad.unicode((which === 'top')
              ? func('top')
              : func('bottom'))}
          </Text>
        );
      };
    
    if (wordType === 'top') {
    return (<View style={{flexDirection: 'row', justifyContent: 'space-between', width:'100%', alignSelf: 'center',}}>
        <View style={{flexDirection: 'column', width: "80%"}}>
        <TouchableOpacity onPress={() => { dispatch(setAttempt((state.topWord === '') ? state.topHint : state.topWord)); }} style={styles.answerTouchOpacity}>
            {awayOrTogether('top')}
        </TouchableOpacity>
        <ScrollView
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{ marginStart:15, width: '90%', ...styles.definitionText }}
        >
            <Text style={styles.definitionText}>
            {state.firstWord.meaning}
            </Text>
        </ScrollView>
        </View>
        <HintButton wordType={wordType} />
    </View>
    )
    } else if (wordType === 'bottom') {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width:'100%'}}>
          <View style={{flexDirection: 'column', width: "80%"}}>
              {/* {Array.from(Array(state.secondWord.engText.length), (e,i) => {
                  return {<Text style={styles.answerText}>
                  {Anvaad.unicode(state.bottomWord[i])}
                  </Text>}
                })} */}
              <TouchableOpacity onPress={() => { dispatch(setAttempt((state.bottomWord === '') ? state.bottomHint : state.bottomWord)); }} style={styles.answerTouchOpacity}>
                {awayOrTogether('bottom')}
              </TouchableOpacity>
            <ScrollView
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{ marginStart:15, width: '90%', ...styles.definitionText }}
            >
              <Text style={styles.definitionText}>
                {state.secondWord.meaning}
              </Text>
            </ScrollView>
          </View>
          <HintButton wordType={wordType} />
        </View>
        );
    }

};