/* eslint-disable no-promise-executor-return */
import * as React from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import * as Analytics from "expo-firebase-analytics";
import PropTypes from "prop-types";
import {
  setBottomHint,
  setGivenUpWords,
  setNewWords,
  setTopHint,
  setTopWord,
  setBottomWord,
  setGiveUpLives,
  setConfetti,
} from "../../redux/actions";

const HintButton = ({ wordType }) => {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();

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
  });

  const styles = StyleSheet.create({
    giveUp: {
      marginRight: 5,
      justifyContent: "center",
      alignSelf: "center",
      backgroundColor: "orange",
      opacity: 1,
      width: dime * 0.1,
      height: dime * 0.1,
      borderRadius: 10,
    },
    giveUpTxt: {
      textAlign: "center",
      alignItems: "center",
      alignSelf: "center",
      fontSize: dime * 0.08,
      width: "100%",
      margin: "auto",
    },
  });

  const hintUsed = async (theWord, engText) => {
    await Analytics.logEvent("hint_used", { theWord, engText });
  };

  const givenUpWord = async (theWord, engText) => {
    await Analytics.logEvent("given_up_word", { theWord, engText });
  };
  const hintBtn = (word) => {
    let bgColor;
    let iconColor;
    let iconName;
    if (state.giveUpsLeft === 0) {
      bgColor = "#919191";
      iconColor = "white";
      iconName = "lightbulb-on";
      if (word !== "") {
        bgColor = "#06FF00";
        iconColor = "black";
        iconName = "check";
      }
    } else if (word !== "") {
      bgColor = "#06FF00";
      iconColor = "black";
      iconName = "check";
    } else {
      bgColor = "transparent";
      iconColor = "orange";
      iconName = "lightbulb-on";
    }

    return {
      backgroundColor: bgColor,
      color: iconColor,
      name: iconName,
    };
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // pulse the bulb icon every 30 seconds to get the user's attention
  if (state.topWord !== "" && state.bottomWord !== "") {
    return null;
  }
  if (wordType === "top") {
    return (
      <TouchableOpacity
        disabled={state.giveUpsLeft === 0 || state.topWord !== ""}
        style={{
          ...styles.giveUp,
          backgroundColor: hintBtn(state.topWord).backgroundColor,
        }}
        onPress={async () => {
          const newTopLength = state.topHint.length;
          const hT = (state.topHint + state.firstWord.engText[newTopLength]).toString();
          dispatch(setTopHint(hT));
          dispatch(setGiveUpLives("-"));
          if (state.topHint === state.firstWord.engText.substring(0, state.firstLength - 1)) {
            givenUpWord(state.firstWord.punjabiText, state.firstWord.engText);
            dispatch(setTopWord());
            dispatch(setGivenUpWords(state.firstWord));
            if (state.bottomWord !== "") {
              if (
                state.showPopUp ||
                (state.levelProgress[0].level === state.finalLevel - 1 &&
                  state.levelProgress[0].wordsNeeded === 0)
              ) {
                // time delay for 1500 seconds
                dispatch(setConfetti(true));
                await delay(3000);
              }
              dispatch(setNewWords());
            }
          } else {
            hintUsed(state.firstWord.punjabiText, state.firstWord.engText);
          }
        }}
      >
        <IconM
          name={hintBtn(state.topWord).name}
          color={hintBtn(state.topWord).color}
          style={styles.giveUpTxt}
        />
      </TouchableOpacity>
    );
  }
  if (wordType === "bottom") {
    return (
      <TouchableOpacity
        disabled={state.giveUpsLeft === 0 || state.bottomWord !== ""}
        style={{
          ...styles.giveUp,
          backgroundColor: hintBtn(state.bottomWord).backgroundColor,
        }}
        onPress={async () => {
          const newBottomLength = state.bottomHint.length;
          const hB = (state.bottomHint + state.secondWord.engText[newBottomLength]).toString();
          dispatch(setBottomHint(hB));
          dispatch(setGiveUpLives("-"));
          if (state.bottomHint === state.secondWord.engText.substring(0, state.secondLength - 1)) {
            givenUpWord(state.secondWord.punjabiText, state.secondWord.engText);
            dispatch(setBottomWord());
            dispatch(setGivenUpWords(state.secondWord));
            if (state.topWord !== "") {
              if (
                state.showPopUp ||
                (state.levelProgress[0].level === state.finalLevel - 1 &&
                  state.levelProgress[0].wordsNeeded === 0)
              ) {
                // time delay for 1500 seconds
                dispatch(setConfetti(true));
                await delay(3000);
              }
              dispatch(setNewWords());
            }
          } else {
            hintUsed(state.secondWord.punjabiText, state.secondWord.engText);
          }
        }}
      >
        <IconM
          name={hintBtn(state.bottomWord).name}
          color={hintBtn(state.bottomWord).color}
          style={styles.giveUpTxt}
        />
      </TouchableOpacity>
    );
  }
  return null;
};

HintButton.propTypes = {
  wordType: PropTypes.string.isRequired,
};

export default HintButton;
