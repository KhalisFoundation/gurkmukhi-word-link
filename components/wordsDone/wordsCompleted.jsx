/* eslint-disable no-nested-ternary */
import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import AppLoading from "expo-app-loading";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as Anvaad from "anvaad-js";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";
import Level from "./levelDisplays";
import { showMeaningPopUp } from "../../redux/actions";
import * as Platform from "../../util/orientation";

const RightWords = ({ navigation }) => {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  const theCorrectWords = state.correctWords;
  const theGivenUpWords = state.givenUpWords;
  const [fontsLoaded] = useFonts({
    Arial: require("../../assets/fonts/Arial.ttf"),
    GurbaniHeavy: require("../../assets/fonts/GurbaniAkharHeavySG.ttf"),
    Bookish: require("../../assets/fonts/Bookish.ttf"),
    Mochy: require("../../assets/fonts/Mochy.ttf"),
    Muli: require("../../assets/fonts/Muli.ttf"),
    Prabhki: require("../../assets/fonts/Prabhki.ttf"),
  });

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

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: "#D1FBFF",
      justifyContent: "space-between",
      width: "100%",
      height: "100%",
      paddingBottom: localState.orientation === "portrait" ? null : 10,
    },
    inner: {
      width: screen.width,
      backgroundColor: "#00E9FE",
      alignItems: "center",
    },
    downStyle: {},
    meaningStyle: {
      width: "90%",
      height: dime * 0.175,
      backgroundColor: "#00E9FE",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    arrow: {
      position: "absolute",
      bottom: 0,
      right: 0,
      height: dime * 0.09,
      width: dime * 0.09,
      marginBottom: "0%",
      backgroundColor: "#fff",
      borderRadius: dime * 0.05,
      elevation: 5,
    },
    listContainer: {
      // backgroundColor: colors.wordsCompleted.listContainer,
      height:
        localState.orientation === "portrait"
          ? Platform.isTablet()
            ? "60%"
            : "70%"
          : Platform.isTablet()
          ? "45%"
          : "50%",
      width: "95%",
      paddingBottom: 5,
      paddingTop: 10,
    },
    listContainerFull: {
      height:
        localState.orientation === "portrait"
          ? Platform.isTablet()
            ? "80%"
            : "85%"
          : Platform.isTablet()
          ? "70%"
          : "85%",
      width: "95%",
      paddingBottom: 30,
      paddingTop: 10,
    },
    answerBoxAlt: {
      height: "5%",
      width: "95%",
    },
    answerBox: {
      backgroundColor: "#fff",
      width: "95%",
      height: localState.orientation === "portrait" ? "20%" : "30%",
      borderRadius: 20,
      padding: 15,
      elevation: 5,
    },
    answerRow: {
      flexDirection: "row",
    },
    answerRowAlt: {
      display: "none",
    },
    answerText: {
      fontSize: dime * 0.04,
      color: "#464646",
      fontFamily: "Muli",
    },
    answerForAnswerText: {
      fontSize: dime * 0.04,
      color: "green",
      fontFamily: "Muli",
    },
    shadow: {
      shadowColor: "black",
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
    absLeft: { position: "absolute", left: 10 },
    mt5: { marginTop: 5 },
    prabhkiFont: { fontSize: dime * 0.08, fontFamily: "Prabhki" },
    completedLevels: {
      color: "#000",
      fontSize: dime * 0.05,
      fontFamily: "Muli",
      margin: 0,
    },
  });

  const longestMeaning = {
    engText: "",
    punjabiText: "",
    meaning: "",
    level: "",
    status: "",
  };

  const [showAnswer, setAnswer] = React.useState(longestMeaning);

  const theWords = theCorrectWords.map((word) => ({
    ...word,
    status: "Answered correctly",
    color: "green",
  }));
  theGivenUpWords.map((word) => {
    theWords.push({
      ...word,
      status: "Given Up",
      color: "red",
    });
    return "nothing";
  });

  const levelsWithWords = {};
  theWords.map((word) => {
    if (levelsWithWords[word.level] === undefined) {
      levelsWithWords[word.level] = [word];
    } else {
      levelsWithWords[word.level].push(word);
    }
    return "nothing";
  });
  const levels = [];
  for (let i = 0; i < state.ALL_WORDS.levels.length - 1; i += 1) {
    if (levelsWithWords[i + 1]) {
      levels.push({
        key: String(i + 1),
        text: `Level ${String(i + 1)}`,
        words: levelsWithWords[i + 1],
      });
    }
  }
  let levelsLeft;
  if (state.finalLevel - state.levelProgress[0].level - 1 > 0) {
    levelsLeft = `${
      state.levelProgress[0].wordsNeeded !== 10 && state.finalLevel !== 8
        ? state.finalLevel - state.levelProgress[0].level - 1
        : state.finalLevel - state.levelProgress[0].level
    } levels to go`;
  } else {
    levelsLeft = "More levels coming soon";
  }
  levels.push({
    key: "end",
    text: levelsLeft,
    words: [],
  });

  useEffect(() => {
    dispatch(showMeaningPopUp(true));
  }, []);

  const renderItem = React.useCallback(
    ({ item }) => (
      <Level levelId={item.key} title={item.text} theWords={item.words} setAnswer={setAnswer} />
    ),
    []
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#00E9FE" barStyle="dark-content" />
      <View style={styles.inner}>
        <View style={[!state.meaningPopup ? styles.downStyle : null, styles.meaningStyle]}>
          <IonIcons
            name="chevron-back"
            color="#000"
            style={styles.absLeft}
            size={dime * 0.07}
            onPress={() => {
              navigation.navigate("AkharJor");
            }}
          />
          <Text style={styles.completedLevels}>Completed Levels</Text>
        </View>
      </View>
      <View style={state.meaningPopup ? styles.listContainerFull : styles.listContainer}>
        {state.x}
        <FlatList
          data={levels}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={state.meaningPopup ? styles.answerBoxAlt : styles.answerBox}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            dispatch(showMeaningPopUp(!state.meaningPopup));
          }}
        >
          <Icon
            name={state.meaningPopup ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={dime * 0.09}
            color="#274C7C"
            style={styles.shadow}
          />
        </TouchableOpacity>
        <View style={state.meaningPopup ? styles.answerRowAlt : styles.answerRow}>
          <Text
            style={[styles.answerForAnswerText, styles.prabhkiFont, { color: showAnswer.color }]}
          >
            {showAnswer.engText}
          </Text>
          {/* to be asked */}
          {showAnswer.engText ? (
            <Text style={[styles.answerForAnswerText, styles.mt5, { color: showAnswer.color }]}>
              {" {"}
              {Anvaad.translit(showAnswer.engText)}
              {"}"}
            </Text>
          ) : (
            <Text style={[styles.answerText, styles.mt5]}>Select any word to know more!</Text>
          )}
        </View>
        <View style={state.meaningPopup ? styles.answerRowAlt : styles.answerRow}>
          <ScrollView scrollEventThrottle={16} showsHorizontalScrollIndicator={false} horizontal>
            <Text style={[styles.answerForAnswerText, { color: showAnswer.color }]}>
              {showAnswer.meaning}
            </Text>
          </ScrollView>
        </View>
        {showAnswer.status ? (
          <View style={state.meaningPopup ? styles.answerRowAlt : styles.answerRow}>
            <Text style={styles.answerText}>Status</Text>
            <Text style={styles.answerText}> : </Text>
            <Text style={[styles.answerForAnswerText, { color: showAnswer.color }]}>
              {showAnswer.status}
            </Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

RightWords.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default RightWords;
