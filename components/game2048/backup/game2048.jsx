/* eslint-disable */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated, Easing
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Anvaad from 'anvaad-js';
import { useState, useRef, useEffect } from 'react';
import YouWonModal from '../resultModal';
import {
  moveUp, moveDown, moveLeft, moveRight, checkWin, isOver, generateRandom, changed
} from '../slideLogic';
import {
  setBoard, resetBoard, setPunjabiNums, setNewBoardOnComplete
} from '../../../redux/actions';

const Game2048 = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
    Nasa: require('../../assets/fonts/Nasalization.otf'),
    Prabhki: require('../../assets/fonts/Prabhki.ttf'),
  });
  const screenWidth = Dimensions.get('window').width;

  const data = state.board;
  const colorCodes = {
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
  };

  // swipe gestures
  const [swipeWay, setSwipeWay] = React.useState({
    myText: 'I\'m ready to get swiped!',
    gestureName: 'none',
    backgroundColor: '#fff'
  });
  const onSwipeUp = (gestureState) => {
    setSwipeWay({ myText: 'You swiped up!' });
    const newData = moveUp(state.board);
    if (changed(newData, state.board)) {
      dispatch(setBoard(generateRandom(newData)));
    }
  }
  const onSwipeDown = (gestureState) => {
    setSwipeWay({ myText: 'You swiped down!' });
    const newData = moveDown(state.board);
    if (changed(newData, state.board)) {
      dispatch(setBoard(generateRandom(newData)));
    }
  }
  const onSwipeLeft = (gestureState) => {
    setSwipeWay({ myText: 'You swiped left!' });
    const newData = moveLeft(state.board);
    if (changed(newData, state.board)) {
      dispatch(setBoard(generateRandom(newData)));
    }
  }
  const onSwipeRight = (gestureState) => {
    setSwipeWay({ myText: 'You swiped right!' });
    const newData = moveRight(state.board);
    if (changed(newData, state.board)) {
      dispatch(setBoard(generateRandom(newData)));
    }
  }
  const onSwipe = (gestureName, gestureState) => {
    setSwipeWay({ gestureName });
  }

  const config = {
    velocityThreshold: 0.25,
    directionalOffsetThreshold: 80
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      backgroundColor: '#274C7C',
    },
    bgSquare: {
      margin: 15,
      width: screenWidth * 0.8,
      height: screenWidth * 0.8,
      borderRadius: 10,
      padding: 10,
      backgroundColor: '#FFB846',
    },
    gridRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gridColumn: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

    },
    gridSquare: {
      width: (screenWidth * 0.7) / 4,
      height: (screenWidth * 0.7) / 4,
      marginBottom: 5,
      marginRight: 5,
      borderRadius: 10,
      textAlign: 'center',
      justifyContent: 'center',
      backgroundColor: '#0005',
    },
    numText: {
      textAlign: 'center',
      color: '#000',
      fontSize: (state.punjabiNums) ? 30 : 20,
      fontFamily: (state.punjabiNums) ? 'GurbaniHeavy' : 'Muli',
    },
    otherScreens: {
      flexDirection: 'row',
      // backgroundColor: "yellow",
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '80%',
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 50,
      margin: 10
    },
    optText: {
      textAlign: 'center',
      color: '#000',
      fontFamily: 'Muli',
      alignSelf: 'center',
      fontSize: 18,
      textShadowColor: 'black',
      textShadowOffset: {
        width: 0.5,
        height: 0.5
      },
      textShadowRadius: 1,
    },
    back: {
      backgroundColor: '#035',
      padding: 10,
      borderRadius: 50,
      alignSelf: 'flex-start',
      marginTop: 15,
      marginLeft: 10,
    },
    help: {
      backgroundColor: '#035',
      padding: 10,
      borderRadius: 50,
      alignSelf: 'flex-end',
      marginTop: 15,
      marginLeft: 10,
    },
    upBox: {
      backgroundColor: '#035',
      padding: 10,
      borderRadius: 50,
      alignSelf: 'center',
      alignItems: 'center',
      marginTop: 15,
      marginLeft: 10,
    },
    upText: {
      color: 'white',
      fontSize: 15,
      fontFamily: 'Muli',
    }
  });

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true,
      }
    ).start();
  }, [state.board]);

  const animatedValue = new Animated.Value(0);

  const buttonScale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.035, 1.07]
  });

  const [won, setWon] = useState(false);
  useEffect(() => {
    if (!checkWin(state.board) && isOver(state.board)) {
      setWon(false);
      dispatch(setNewBoardOnComplete());
    }
    if (checkWin(state.board)) {
      setWon(true);
      dispatch(setNewBoardOnComplete());
    }
  }, [state.board]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {state.resultShow ? <YouWonModal won={won} /> : null}
      <View
        style={{ justifyContent: 'space-between', flexDirection: 'row', width: '90%' }}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <MaskedView
            style={{ width: 35, height: 35 }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                }}
              >
                <IonIcons name="arrow-back" size={35} color="#464646" style={styles.shadow} />
              </View>
        )}
          >
            <LinearGradient
              colors={['#ff8008', '#ffc837']}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </TouchableOpacity>
        <View
          style={styles.upBox}
        >
          <Text style={styles.upText}>
            Moves
            {': '}
            {state.moves}
          </Text>
        </View>
        <View
          style={styles.upBox}
        >
          <Text style={styles.upText}>
            Score
            {': '}
            {state.score}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.help}
          onPress={() => navigation.navigate('help')}
        >
          <MaskedView
            style={{ width: 35, height: 35 }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                }}
              >
                <IonIcons name="help" size={35} color="#464646" style={styles.shadow} />
              </View>
        )}
          >
            <LinearGradient
              colors={['#ff8008', '#ffc837']}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </TouchableOpacity>
      </View>
      <MaskedView
        style={{ width: '100%', height: 100 }}
        maskElement={(
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: 'GurbaniHeavy', fontSize: 80 }}>
              2048
            </Text>
          </View>
        )}
      >
        <LinearGradient
          colors={['#ff8008', '#ffc837']}
          style={{ flex: 1 }}
        />
      </MaskedView>
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        onSwipeUp={(state) => onSwipeUp(state)}
        onSwipeDown={(state) => onSwipeDown(state)}
        onSwipeLeft={(state) => onSwipeLeft(state)}
        onSwipeRight={(state) => onSwipeRight(state)}
        config={config}
      >
        <View style={styles.bgSquare}>
          <View style={styles.gridColumn}>
            {data.map((row, rowIndex) => (
              <View style={styles.gridRow} key={rowIndex}>
                {row.map((num, numIndex) => {
                  if (num !== 0) {
                    return (
                      <View
                        style={{
                          ...styles.gridSquare, backgroundColor: colorCodes[num], borderColor: '#0005', borderWidth: 1,
                        }}
                        key={numIndex}
                      >
                        <Text style={{ ...styles.numText, fontSize: (num >= 128) ? 25 : 30 }}>
                          {(state.punjabiNums) ? Anvaad.unicode(num) : num}
                        </Text>
                      </View>
                    );
                  }
                  return (<View style={styles.gridSquare} key={numIndex} />);

                })}
              </View>
            ))}
          </View>
        </View>
      </GestureRecognizer>
      <View style={styles.otherScreens}>
        <TouchableOpacity style={{ width: '50%', flexDirection: 'row' }} onPress={() => { dispatch(resetBoard()); }}>
          <MaskedView
            style={{ width: 35, height: 35 }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IonIcons name="reload" size={30} color="#464646" style={styles.shadow} />
              </View>
        )}
          >
            <LinearGradient
              colors={['#FF0076', '#590FB7']}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <Text style={styles.optText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '50%', flexDirection: 'row' }} onPress={() => { dispatch(setPunjabiNums(!state.punjabiNums)); }}>
          <MaskedView
            style={{ width: 35, height: 35 }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IonIcons name="language" size={30} color="#464646" style={styles.shadow} />
              </View>
        )}
          >
            <LinearGradient
              colors={['#FF0076', '#590FB7']}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <Text style={styles.optText}>Language</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Game2048;
