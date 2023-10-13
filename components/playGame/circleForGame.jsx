/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable no-promise-executor-return */
import * as Anvaad from "anvaad-js";
import * as React from "react";

import { Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  setAttempt,
  setCorrectWords,
  setBottomWord,
  setTopWord,
  setLevelProgress,
  setNewWords,
  setConfetti,
} from "../../redux/actions";
import * as Platform from "../../util/orientation";
import { gurmukhi } from "../utils/gurmukhi";

const TheCircle = () => {
  // there can only be from 2-18 characters as input
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  // const { width } = dimensions;

  const [localState, setLocalState] = React.useState({
    orientation: Platform.isPortrait() ? "portrait" : "landscape",
    devicetype: Platform.isTablet() ? "tablet" : "phone",
  });

  // Event Listener for orientation changes
  const [screen, setScreen] = React.useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });

  let dime = Math.min(screen.width, screen.height);
  Dimensions.addEventListener("change", () => {
    dime = Math.min(screen.width, screen.height);
    setScreen({
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    });
    setLocalState({
      orientation: Platform.isPortrait() ? "portrait" : "landscape",
    });
  });

  const getGurmukhi = (text) => {
    if (state.romanised) {
      return Anvaad.translit(text);
    }
    return gurmukhi(text);
  };

  const [fontsLoaded] = useFonts({
    Arial: require("../../assets/fonts/Arial.ttf"),
    GurbaniHeavy: require("../../assets/fonts/GurbaniAkharHeavySG.ttf"),
    GurbaniAkharSG: require("../../assets/fonts/GurbaniAkharSG.ttf"),
    Muli: require("../../assets/fonts/Muli.ttf"),
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const ifCorrectWord = async (word) => {
    let somethingHappened = false;
    if (word === state.firstWord.engText && state.topWord === "") {
      if (!state.correctWords.includes(state.firstWord)) {
        dispatch(setTopWord());
        dispatch(setCorrectWords(state.firstWord));
        dispatch(setLevelProgress(state.firstWord));
        somethingHappened = true;
      }
      // if bottomWord is filled that means both are now answered so will get new words
      if (state.bottomWord !== "") {
        if (state.showPopUp) {
          // time delay for 1500 seconds
          dispatch(setConfetti(true));
          await delay(3000);
        }
        dispatch(setNewWords());
        somethingHappened = true;
      }
    }
    if (word === state.secondWord.engText && state.bottomWord === "") {
      if (!state.correctWords.includes(state.secondWord)) {
        dispatch(setBottomWord());
        dispatch(setCorrectWords(state.secondWord));
        dispatch(setLevelProgress(state.secondWord));
        somethingHappened = true;
      }
      // if topWord is filled that means both are now answered so will get new words
      if (state.topWord !== "") {
        if (state.showPopUp) {
          // time delay for 1500 seconds
          dispatch(setConfetti(true));
          await delay(3000);
        }
        dispatch(setNewWords());
        somethingHappened = true;
      }
    }
    // this condition resets all the logic if a word is completed
    if (somethingHappened) {
      dispatch(setAttempt(""));
    }
  };

  const touchedMe = (object, final) => {
    dispatch(setAttempt(final));
    ifCorrectWord(final);
  };
  const { charArray } = state;
  const prevAttempt = state.attempt;

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
    lettersCircle: {
      width: dime,
      height:
        dime * (Platform.isTablet() ? (localState.orientation === "portrait" ? 0.5 : 0.8) : 1),
    },
    // clearBox: {
    //   width: 0.12*width,
    //   height: 0.12*width,
    //   justifyContent: 'center',
    //   alignItems: 'center'
    // },
    characterText: {
      fontSize: dime > 500 ? dime * 0.055 : dime * 0.08,
      color: "#FF7E00",
      textAlign: "center",
      fontFamily: state.romanised ? "Muli" : "GurbaniAkharSG",
    },
    commonChar: {
      position: "relative",
      width: dime > 500 ? dime * 0.079 : dime * 0.115,
      height: dime > 500 ? dime * 0.079 : dime * 0.115,
      backgroundColor: "transparent",
      elevation: 5,
      borderRadius: 10,
      justifyContent: "center",
    },
  });

  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
  let angle = 0;

  const getRadius = () => {
    if (dime > 500) {
      return 0.18 * dime;
    }
    return 0.25 * dime;
  };
  const radius = getRadius(); // dime * 0.25;
  const step = (2 * Math.PI) / charArray.length;
  const newHeight = dime > 500 ? dime * 0.2 : dime * 0.25;
  const newWidth = dime * 0.45;
  //  const colorCombos = [['#E233FF', '#FF6B00'],
  // ['#FF0076', '#590FB7'], ['#ffc500', '#c21500'], ['#182848', '#4b6cb7'],
  // ['#e43a15', '#e65245'], ['#480048', '#c04848'], ['#dc2424', '#4a569d'], ['#4776e6', '#8e54e9'],
  // ['#16222a', '#3a6073'], ['#ff8008', '#ffc837'], ['#eb3349', '#f45c43'], ['#aa076b', '#61045f'],
  // ['#ff512f', '#dd2476'], ['#e55d87', '#5fc3e4'], ['#c31432', '#240b36']];
  // const colorRandom = Math.floor(Math.random() * colorCombos.length);
  // const [colorCenter] = useState(colorCombos[colorRandom]);;

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AnimatedLinearGradient colors={["transparent", "transparent"]} style={styles.lettersCircle}>
      {charArray.map((char) => {
        const x = Math.round(newWidth + radius * Math.cos(angle));
        const y = Math.round(newHeight + radius * Math.sin(angle));
        // let theLetter = String.fromCharCode(char);
        const theLetter = getGurmukhi(char);
        angle += step;
        return (
          <TouchableOpacity
            onPress={() => {
              let final;

              if (prevAttempt === undefined) {
                final = char;
              } else if (char === "i" && prevAttempt !== "") {
                /* reason for doing this is so you can type ਰਹਿਣ correctly.
                If this if wasn't there you would need to type ਰਹਿਣ as ਰਿਹਣ to get correct answer
                because ਰਹਿਣ changes to ਰਹਣਿ */
                const prevString = prevAttempt.substring(0, prevAttempt.length - 1);
                final = prevString + char + prevAttempt[prevAttempt.length - 1];
              } else {
                final = prevAttempt + char;
              }
              touchedMe(char, final);
            }}
            key={char}
            style={{
              ...styles.commonChar,
              position: "absolute",
              left: x,
              top: y,
              zIndex: 0,
            }}
          >
            <LinearGradient colors={["#ffe400", "#848900"]} style={styles.commonChar}>
              <Text key={char} style={{ ...styles.characterText, zIndex: 0, color: "#032b45" }}>
                {theLetter}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
      {/* {(state.attempt == "") ? <View style={{borderRadius: 25,
          height: 40,
          width: 40,alignSelf: 'center'}}></View> :
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 25,
          height: 40,
          width: 40,
          alignSelf: 'center',
          top: newHeight,
          elevation: 5,
          ...animatedScaleStyle
        }}
        onPress={() => {
          dispatch(setAttempt(''));
        }}
      >
        <MaskedView
          style={{
            height: 50,
            width: 50
          }}
          maskElement={(
            <View
              style={{
                backgroundColor: 'transparent',
                padding: 5
              }}
            >
              <IconM name="reload" size={30} color="black" style={styles.clearBox} />
            </View>
        )}
        >
          <LinearGradient
            colors={['#FF0076', '#590FB7']}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </TouchableOpacity>} */}
    </AnimatedLinearGradient>
  );
};

export default TheCircle;
