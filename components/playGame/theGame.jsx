/* eslint-disable no-nested-ternary */
import * as React from "react";
import { View, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import IonIcons from "react-native-vector-icons/Ionicons";
import ConfettiCannon from "react-native-confetti-cannon";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Analytics from "expo-firebase-analytics";
import PropTypes from "prop-types";
import WordsDoneModal from "./modalNextWord";
import { openNextLevelModal } from "../../redux/actions";
import Help from "./help";
import TheCircle from "./circleForGame";
import * as Platform from "../../util/orientation";
import AttemptInput from "./attemptInput";
import WordBox from "./wordBox";
import StatsBox from "./statsBox";
import ProgressBar from "./progressBar";
import Footer from "./footer";

const GameScreen = ({ navigation }) => {
  const state = useSelector((theState) => theState);
  // const [visited, setVisited] = useState([]);
  // const [word, setWord] = useState('');
  // dummy state const [reset, setReset] = useState(false);

  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Arial: require("../../assets/fonts/Arial.ttf"),
    GurbaniHeavy: require("../../assets/fonts/GurbaniAkharHeavySG.ttf"),
    Bookish: require("../../assets/fonts/Bookish.ttf"),
    Mochy: require("../../assets/fonts/Mochy.ttf"),
    Muli: require("../../assets/fonts/Muli.ttf"),
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

  let dimeMin = Math.min(screen.width, screen.height);
  Dimensions.addEventListener("change", () => {
    dimeMin = Math.min(screen.width, screen.height);
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
      width: "100%",
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: 50,
    },
    scroller: {
      height: "100%",
      width: "100%",
      flexDirection: localState.orientation === "portrait" ? "column" : "row",
      padding: localState.orientation === "portrait" ? null : dimeMin * 0.05,
      justifyContent: Platform.isTablet()
        ? localState.orientation === "portrait"
          ? "flex-start"
          : "space-around"
        : "space-between",
    },
    // status: {
    //   color: 'black',
    //   fontSize: dimensions.size['10'],
    //   fontFamily: 'Bookish',
    //   justifyContent: 'center',
    // },
    // ball: {
    //   width: 100,
    //   height: 100,
    //   borderRadius: 100,
    //   backgroundColor: 'blue',
    //   alignSelf: 'center',
    // },
    wordBox: {
      // flexDirection: "column",
      width:
        dimeMin *
        (Platform.isTablet() ? (localState.orientation === "portrait" ? 0.6 : 0.55) : 0.8),
      height:
        dimeMin * (Platform.isTablet() ? (localState.orientation === "portrait" ? 0.5 : 0.8) : 0.6),
      justifyContent: "center",
      alignSelf: "center",
      padding: 0,
      paddingLeft: Platform.isTablet() && localState.orientation === "landscape" ? 50 : null,
      margin: 0,
      backgroundColor: "transparent",
      borderRadius: 30,
    },
    wordBoxAnswers: {
      // flexDirection: "column",
      width: dimeMin * (Platform.isTablet() ? 0.6 : 0.8),
      height: Platform.isTablet() ? (localState.orientation === "portrait" ? "65%" : "50%") : "70%",
      paddingHorizontal: 10,
      marginHorizontal: 10,
      justifyContent: "space-evenly",
      alignSelf: "center",
      backgroundColor: "transparent",
      borderRadius: 30,
    },
    header: {
      height: 65,
      width: "80%",
      margin: 5,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  const ranOutOfLives = async (level) => {
    await Analytics.logEvent("ran_out_of_lives", { level_at: level });
  };

  if (state.giveUpsLeft === 0) {
    ranOutOfLives(state.levelProgress[0].level);
  }

  React.useEffect(() => {
    if (state.levelProgress.length === 0) {
      dispatch(openNextLevelModal());
    }
  }, [state.levelProgress, dispatch]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <LinearGradient
      colors={["#000", "#330867", "#304877"]}
      start={{ x: 0, y: -1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        {state.helpPage ? <Help /> : null}
        {state.nextLevelModal[0] ? <WordsDoneModal /> : null}
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              height: dimeMin * 0.2,
              backgroundColor: "transparent",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IonIcons name="close" size={dimeMin * 0.08} color="#fff" />
            </TouchableOpacity>
            <View style={styles.header}>
              <StatsBox stat="levels" navigation={navigation} />
              <StatsBox stat="hints" navigation={navigation} />
              {/* <StatsBox stat="points" navigation={navigation} /> */}
            </View>
            {/* <IonIcons
            name="help"
            size={dimeMin * 0.08}
            color="black"
            onPress={() => {
              dispatch(openHelpModal());
            }}
          /> */}
          </View>
          <View style={{ width: "80%" }}>
            <ProgressBar steps={10} currentStep={state.levelProgress[0]} />
          </View>
        </View>
        <View style={styles.scroller}>
          {/* <View
          style={styles.header}
          >
          <StatsBox stat="levels" navigation={navigation} />
          <StatsBox stat="hints" navigation={navigation} />
          {/* <StatsBox stat="points" navigation={navigation} />
          </View> */}

          <View style={styles.wordBox}>
            <LinearGradient colors={["#ff6f00", "#b34e00"]} style={styles.wordBoxAnswers}>
              <View>
                <WordBox wordType="top" />
                <WordBox wordType="bottom" />

                {/* <TouchableOpacity
              style={styles.newWord}
              title="New Words"
              onPress={() => {
                dispatch(setNewWords());
              }}
            >
              <Text>New Word</Text>
            </TouchableOpacity> */}
              </View>
            </LinearGradient>

            <AttemptInput />
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              maxWidth: Platform.isTablet() ? dimeMin * 0.8 : null,
              maxHeight: Platform.isTablet() ? dimeMin * 0.6 : null,
              paddingTop:
                Platform.isTablet() && localState.orientation === "landscape" ? dimeMin / 10 : null,
            }}
          >
            {/* {keyboardGrid.map((letters, index) => {
                return (
                  <View style={styles.keyboardRow} >
                    {letters.map((letter, index)=>{
                    //   if (letter === 'meta') {
                    //   return (
                    //     <TouchableOpacity style={styles.key}
                              key={letter} onPress={() => {touchedMe(state.attempt.slice(0,-1))}}>
                    //       <Text style={{...styles.keyText, fontSize:(width<370 ? 14 : 20)}}>
                                {"\u2190"}</Text>
                    //     </TouchableOpacity>
                    //   );
                    // }

                    // if (letter === 'space') {
                    //   return (
                    //     <TouchableOpacity style={styles.key}
                            key={letter} onPress={() => {dispatch(setAttempt(' '))}}>
                    //       <Text style={{...styles.keyText, fontSize:(width<370 ? 14 : 20)}}>
                                {"\u2423"}</Text>
                    //     </TouchableOpacity>
                    //   );
                    // }

                    return (
                      <TouchableOpacity
                      style={styles.key}
                        onPress={() => {touchedMe(state.attempt+letter)}}
                      >
                        <Text
                          style={{
                            ...styles.keyText,
                            fontFamily: state.romanised ? 'Muli' : 'Bookish',
                            fontSize: dimensions.size['8']}}>
                          {gurmukhi(letter)}
                        </Text>
                      </TouchableOpacity>
                    );
                    })}
                </View>)
            })} */}
            <TheCircle />
            {/* condition to show hint button only when both words are not guessed */}
            <Footer dispatch={dispatch} />
          </View>
        </View>
      </SafeAreaView>
      {state.confetti ? (
        <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fallSpeed={2000} autoStart />
      ) : null}
    </LinearGradient>
  );
};

GameScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default GameScreen;
