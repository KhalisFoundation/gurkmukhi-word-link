/* eslint-disable */
import * as Anvaad from 'anvaad-js';
import * as React from 'react';

import {
  Text, StyleSheet, TouchableOpacity, Animated, Easing, View, Dimensions, PanResponder
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useRef, useEffect } from 'react';
import Svg, { Polyline } from 'react-native-svg';
import {
  setAttempt,
  setCorrectWords,
  setBottomWord,
  setTopWord,
  setLevelProgress,
  setNewWords
} from '../../redux/actions';
import dimensions from '../../util/dimensions';

export const TheCircle = ({ visited, setVisited, points }) => {
  // there can only be from 2-18 characters as input
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  const pan = useRef(new Animated.ValueXY()).current;
  const [startXY, setStartXY] = useState({ x: 0, y: 0 });
  const [endXY, setEndXY] = useState({ x: '', y: '' });

  const getText = (text) => {
    if (state.romanised) {
      return Anvaad.translit(text);
    }
    return Anvaad.unicode(text);
  }

  const ifCorrectWord = (word) => {
    let somethingHappened = false;
    if (word === state.firstWord.engText && state.topWord === '') {
      if (!state.correctWords.includes(state.firstWord)) {
        dispatch(setTopWord());
        dispatch(setCorrectWords(state.firstWord));
        dispatch(setLevelProgress(state.firstWord));
        somethingHappened = true;
      }
      // if bottomWord is filled that means both are now answered so will get new words
      if (state.bottomWord !== '') {
        dispatch(setNewWords());
        somethingHappened = true;
      }
    }
    if (word === state.secondWord.engText && state.bottomWord === '') {
      if (!state.correctWords.includes(state.secondWord)) {
        dispatch(setBottomWord());
        dispatch(setCorrectWords(state.secondWord));
        dispatch(setLevelProgress(state.secondWord));
        somethingHappened = true;
      }
      // if topWord is filled that means both are now answered so will get new words
      if (state.topWord !== '') {
        dispatch(setNewWords());
        somethingHappened = true;
      }
    }
    // this condition resets all the logic if a word is completed
    if (somethingHappened) {
      dispatch(setAttempt(''));
      setStartXY({ x: 0, y: 0 });
      setEndXY({ x: '', y: '' });
      dispatch(setAttempt(''));
      setVisited([]);
    }
  };

  const touchedMe = (object, final) => {
    dispatch(setAttempt(final));
    ifCorrectWord(final);
  }

  const prevAttempt = state.attempt;
  const { width } = Dimensions.get('window');
  const { height } = Dimensions.get('window');

  // animations
  // const animatedValue = new Animated.Value(0);

  // const buttonScale = animatedValue.interpolate({
  //   inputRange: [0, 0.5, 1],
  //   outputRange: [1, 1.05, 1.1]
  // });

  // const buttonRotate = animatedValue.interpolate({
  //     inputRange: [0, 0.5, 1],
  //     outputRange: ['0deg', '90deg', '180deg']
  // })

  // const onPressIn = () => {
  //   Animated.timing(animatedValue, {
  //     toValue: 1,
  //     duration: 500,
  //     easing: Easing.linear,
  //     useNativeDriver: true
  //   }).start();
  // };

  // const onPressOut = () => {
  //   Animated.timing(animatedValue, {
  //     toValue: 0,
  //     duration: 500,
  //     easing: Easing.linear,
  //     useNativeDriver: true
  //   }).start();
  // };

  // const animatedScaleStyle = {
  //   transform: [{ scale: buttonScale }]
  // };

  // // rotation animations
  // const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

  // const handleAnimation = () => {
  //   Animated.timing(rotateAnimation, {
  //     toValue: 1,
  //     duration: 800,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     rotateAnimation.setValue(0);
  //   });
  // };

  // const interpolateRotating = rotateAnimation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '720deg'],
  // });

  // const animatedStyle = {
  //   transform: [
  //     {
  //       rotate: interpolateRotating,
  //     },
  //   ],
  //   width: screenWidth
  // };

  const styles = StyleSheet.create({
    container: {
      top: 0,
      width: '100%',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    lettersCircle: {
      height: width,
      width,
      backgroundColor: 'transparent',
      zIndex: -1,
      top: 0,
    },
    clearBox: {
      zIndex: -1,
      width: 0.12 * width,
      height: 0.12 * width,
      justifyContent: 'center',
      alignItems: 'center'
    },
    characterText: {
      paddingBottom: 5,
      fontSize: state.romanised ? dimensions.size['10'] : dimensions.size['10'],
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    commonChar: {
      position: 'relative',
      width: dimensions.size['20'],
      height: dimensions.size['20'],
      backgroundColor: 'transparent',
      elevation: 5,
      borderRadius: 10,
      justifyContent: 'center',
    }
  });

  const pathMaker = (start, end) => {
    let path;
    if (visited.length > 0) {
      path = '';
      visited.forEach((point) => {
        const [x, y] = point.split(',').map((value) => parseInt(value, 10));
        path += `${x + dimensions.size['18'] / 2},${y + dimensions.size['18'] / 2} `;
      });
      path += `${end.x},${(end.y !== '') ? end.y - dimensions.scale * 180 : end.y}`;
    } else {
      path = `${start.x},${start.y} ${end.x},${end.y}`;
    }
    return path;
  };

  const checkIfFound = (xTouch, yTouch) => {
    let foundCoordinates = '';
    let foundWord = '';
    points.map(({ x, y, letter }) => {
      if ((x <= xTouch && xTouch <= x + dimensions.size['18']) && (y + height / 1.55 <= yTouch && yTouch <= y + height / 1.55 + dimensions.size['18'])) {
        foundCoordinates = `${x},${y}`;
        foundWord = letter;
      }
    });
    return [foundCoordinates, foundWord];
  }

  const [panResponder, setPanResponder] = useState(PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (event, gestureState) => true,
    onStartShouldSetPanResponderCapture: (event, gestureState) => true,
    onMoveShouldSetPanResponder: (event, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
    onPanResponderGrant: (event, gestureState) => {
      setStartXY({ x: 0, y: 0 });
      setEndXY({ x: 0, y: 0 });
      // setPassed([]);
    },

    onPanResponderMove: (event, gestureState) => {
      pan.setValue({ x: 0, y: 0 });
      // setting start point if location is right
      const [res, firstLetter] = checkIfFound(gestureState.x0, gestureState.y0);
      if (res) {
        const { x, y } = res;
        setStartXY({ x, y });
      } else {
        setStartXY({ x: '', y: '' });
      }

      const [foundCoordinate, foundWord] = checkIfFound(gestureState.x0 + gestureState.dx,
        gestureState.y0 + gestureState.dy);
      if (foundCoordinate) {
        setVisited((v) => {
          if (v[v.length - 1] !== foundCoordinate) {
            return [...v, foundCoordinate];
          }
          return v;
        });
        dispatch(setAttempt((w) => {
          if (w.slice(-1) !== foundWord) {
            return w + foundWord;
          }
          return w;
        }));
      }
      setEndXY({ x: gestureState.moveX, y: gestureState.moveY });
    },

    onPanResponderRelease: (event, gestureState) => {
      setStartXY({ x: 0, y: 0 });
      setEndXY({ x: '', y: '' });
      setVisited([]);
      dispatch(setAttempt(''));
    }
  }));

  useEffect(() => {
    setPanResponder(PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
      onPanResponderGrant: (event, gestureState) => {
        setStartXY({ x: 0, y: 0 });
        setEndXY({ x: 0, y: 0 });
        // setPassed([]);
      },

      onPanResponderMove: (event, gestureState) => {
        pan.setValue({ x: 0, y: 0 });
        // setting start point if location is right
        const [res, firstLetter] = checkIfFound(gestureState.x0, gestureState.y0);
        if (res) {
          const { x, y } = res;
          setStartXY({ x, y });
        } else {
          setStartXY({ x: '', y: '' });
        }

        const [foundCoordinate, foundWord] = checkIfFound(gestureState.x0 + gestureState.dx,
          gestureState.y0 + gestureState.dy);
        if (foundCoordinate) {
          setVisited((v) => {
            if (v[v.length - 1] !== foundCoordinate) {
              return [...v, foundCoordinate];
            }
            return v;
          });
          dispatch(setAttempt((w) => {
            if (w.slice(-1) !== foundWord) {
              return w + foundWord;
            }
            return w;
          }));
        }
        setEndXY({ x: gestureState.moveX, y: gestureState.moveY });
      },

      onPanResponderRelease: (event, gestureState) => {
        setStartXY({ x: 0, y: 0 });
        setEndXY({ x: '', y: '' });
        setVisited([]);
        dispatch(setAttempt(''));
      }
    }));
  }, [state.charArray]);

  // code for gradient background circle
  // useEffect(() => {
  //   console.log(`word is ${state.attempt}`);
  //   dispatch(setAttempt(word));
  //   ifCorrectWord(state.attempt);
  // },[state.attempt, word]);
  //  const colorCombos = [['#E233FF', '#FF6B00'],
  // ['#FF0076', '#590FB7'], ['#ffc500', '#c21500'], ['#182848', '#4b6cb7'],
  // ['#e43a15', '#e65245'], ['#480048', '#c04848'], ['#dc2424', '#4a569d'], ['#4776e6', '#8e54e9'],
  // ['#16222a', '#3a6073'], ['#ff8008', '#ffc837'], ['#eb3349', '#f45c43'], ['#aa076b', '#61045f'],
  // ['#ff512f', '#dd2476'], ['#e55d87', '#5fc3e4'], ['#c31432', '#240b36']];
  // const colorRandom = Math.floor(Math.random() * colorCombos.length);
  // const [colorCenter] = useState(colorCombos[colorRandom]);;
  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.lettersCircle}
        {...panResponder.panHandlers}
      >
        <Svg style={{
          zIndex: -1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
        }}
        >
          <Polyline
            points={pathMaker(startXY, endXY)} // "M100,250 Q200,150 260,250"
            fill="none"
            stroke="white"
            strokeWidth="10"
          />
        </Svg>
      </View>

      {points.map(({ x, y, letter }) => {
        const char = letter;
        const theLetter = getText(char);
        return (
          <TouchableOpacity
            onPress={() => {
              let final;

              if (prevAttempt === undefined) {
                final = char;
              } else if (char === 'i' && prevAttempt !== '') {
                /* reason for doing this is so you can type ਰਹਿਣ correctly.
            If this if wasn't there you would need to type ਰਹਿਣ as ਰਿਹਣ to get correct answer
            because ਰਹਿਣ changes to ਰਹਣਿ */
                const prevString = prevAttempt.substring(
                  0,
                  prevAttempt.length - 1
                );
                final = prevString + char + prevAttempt[prevAttempt.length - 1];
              } else {
                final = prevAttempt + char;
              }
              touchedMe(char, final);
            }}
            key={char}
            style={{
              ...styles.commonChar,
              position: 'absolute',
              left: x,
              top: y,
              zIndex: 0,
            }}
          >
            <LinearGradient colors={['#ffe400', '#848900']} style={styles.commonChar}>
              <Text key={char} style={{ ...styles.characterText, zIndex: 0, color: '#032b45' }}>
                {theLetter}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
