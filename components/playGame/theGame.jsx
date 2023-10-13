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
import { openHelpModal, openNextLevelModal } from "../../redux/actions";
import Help from "./help";
import TheCircle from "./circleForGame";
import * as Platform from "../../util/orientation";
import AttemptInput from "./attemptInput";
import HintButton from "./hintButton";
import WordBox from "./wordBox";
import StatsBox from "./statsBox";

const GameScreen = ({ navigation }) => {
  const state = useSelector((theState) => theState.theGameReducer);
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
    hintLayout: {
      backgroundColor: "transparent",
      flexDirection: "row",
      alignSelf: "center",
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
      width: "90%",
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
    // answerRow: {
    //   flex: 1,
    //   flexDirection: 'row',
    //   marginTop: 20,
    // },
    // wordBoxText: {
    //   flex: 2,
    //   margin: 5,
    //   flexDirection: 'column',
    //   justifyContent: 'space-evenly',
    //   width: '100%',
    //   height: '100%',
    // },
    // answerText: {
    //   textAlign: 'center',
    //   color: 'black',
    //   fontSize: 35,
    //   borderRadius: 25,
    //   height: 50,
    // },
    // answerTouchOpacity: {
    //   justifyContent: 'center',
    //   paddingTop: 10,
    //   height: 50,
    //   width: '100%',
    //   marginBottom: 10,
    // },
    // giveUp: {
    //   marginRight: 5,
    //   marginTop: 5,
    //   alignSelf: 'center',
    //   backgroundColor: colors.theGame.giveUp,
    //   opacity: 1,
    //   width: 40,
    //   height: 40,
    //   borderColor: 'black',
    //   borderWidth: 2,
    //   borderRadius: 20,
    // },
    // giveUpTxt: {
    //   textAlign: 'center',
    //   alignItems: 'center',
    //   fontSize: (state.giveUpsLeft === 0 || state.topWord !== '') ? 30 : 35,
    //   width: '100%',
    //   height: '100%',
    // },
    // wordAttemptView: {
    //   flexDirection: 'row',
    //   marginTop: 10,
    //   padding: 5,
    //   backgroundColor: colors.theGame.clearBox,
    //   borderRadius: 20,
    //   shadowColor: '#000',
    //   shadowOffset: {
    //     width: 0,
    //     height: 2
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 4,
    //   elevation: 5,
    // },
    // help: {
    //   padding: dimensions.size['4'],
    //   borderRadius: 50,
    //   marginTop: 15,
    // },
    // wordAttempt: {
    //   width: '75%',
    //   height: '100%',
    //   opacity: 0.8,
    //   color: 'white',
    //   borderRadius: 100,
    //   justifyContent: 'center',
    //   textAlign: 'center',
    //   fontSize: 30,
    // },
    // clearBox: {
    //   alignSelf: 'center',
    //   width: 50,
    //   height: 50,
    // },
    // clearBoxText: {
    //   textAlign: 'center',
    //   justifyContent: 'center',
    //   alignContent: 'center'
    // },
    // theCircle: {
    //   position: 'relative'
    // },
    // definitionText: {
    //   fontFamily: 'Muli',
    //   fontSize: 16,
    //   marginBottom: 5,
    //   textShadowColor: 'black',
    //   textShadowOffset: {
    //     width: 0.5,
    //     height: 0.5
    //   },
    //   textShadowRadius: 1,
    //   color: 'black',
    // },
    // upBox: {
    //   backgroundColor: '#072227',
    //   flexDirection: 'row',
    //   height: '70%',
    //   width: '25%',
    //   alignItems: 'center',
    //   borderRadius: 30,
    //   elevation: 5,
    //   justifyContent: 'space-evenly'
    // },
    // upText: {
    //   color: 'white',
    //   fontSize: 15,
    //   fontWeight: 'bold'
    // },
    // keyboardRow: {
    //   width: '100%',
    //   flexDirection: 'row',
    //   justifyContent: 'space-evenly',
    //   alignSelf: 'center',
    //   padding: 7
    // },
    // key: {
    //   width: dimensions.size['20'],
    //   height: dimensions.size['20'],
    //   alignItems: 'center',
    //   textAlign: 'center',
    //   justifyContent: 'center',
    //   marginHorizontal: 5,
    //   marginVertical: 0,
    //   padding: 2,
    //   borderColor: '#000',
    //   borderWidth: 0.5,
    //   borderRadius: 10,
    //   backgroundColor: '#274C7C',
    //   elevation: 5
    // },
    // keyText: {
    //   color: 'white',
    // },
  });

  const ranOutOfLives = async (level) => {
    await Analytics.logEvent("ran_out_of_lives", { level_at: level });
  };

  if (state.giveUpsLeft === 0) {
    ranOutOfLives(state.levelProgress[0].level);
  }

  React.useEffect(() => {
    if (state.levelProgress === []) {
      dispatch(openNextLevelModal());
    }
  }, [state.levelProgress, dispatch]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <LinearGradient colors={["#2289d8", "#032b45"]} style={styles.container}>
      <SafeAreaView style={styles.container}>
        {state.helpPage ? <Help /> : null}
        {state.nextLevelModal[0] ? <WordsDoneModal /> : null}
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View
          style={{
            width: "100%",
            height: dimeMin * 0.2,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            padding: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcons name="chevron-back" size={dimeMin * 0.08} color="black" />
          </TouchableOpacity>
          <View style={styles.header}>
            <StatsBox stat="levels" navigation={navigation} />
            <StatsBox stat="hints" navigation={navigation} />
            {/* <StatsBox stat="points" navigation={navigation} /> */}
          </View>
          <IonIcons
            name="help"
            size={dimeMin * 0.08}
            color="black"
            onPress={() => {
              dispatch(openHelpModal());
            }}
          />
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
            <View style={styles.hintLayout}>
              {state.topWord.length !== state.firstLength ? (
                <HintButton wordType="top" />
              ) : (
                <HintButton wordType="bottom" />
              )}
            </View>
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
