/* eslint-disable no-nested-ternary */
import * as React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { useFonts } from "expo-font";
import * as Animatable from "react-native-animatable";
import AppLoading from "expo-app-loading";
import { setAttempt } from "../../redux/actions";
import gurmukhi from "../utils/gurmukhi";

const AttemptInput = () => {
  const state = useSelector((theState) => theState);
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Arial: require("../../assets/fonts/Arial.ttf"),
    GurbaniHeavy: require("../../assets/fonts/GurbaniAkharHeavySG.ttf"),
    GurbaniAkharSG: require("../../assets/fonts/GurbaniAkharSG.ttf"),
    Bookish: require("../../assets/fonts/Bookish.ttf"),
    Mochy: require("../../assets/fonts/Mochy.ttf"),
    Muli: require("../../assets/fonts/Muli.ttf"),
  });

  // Event Listener for orientation changes
  const [screen, setScreen] = React.useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });

  const maxLength = () => {
    if (state.firstLength > state.secondLength) {
      return state.firstLength;
    }
    return state.secondLength;
  };

  let dime = Math.min(screen.width, screen.height);
  Dimensions.addEventListener("change", () => {
    dime = Math.min(screen.width, screen.height);
    setScreen({
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    });
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: 10,
      backgroundColor: "#transparent",
      elevation: 5,
    },
    wordAttemptView: {
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 8,
      backgroundColor: maxLength() < state.attempt.length ? "#dd4444" : "#b34e00",
      borderWidth: 1,
      borderColor: maxLength() < state.attempt.length ? "#bb0000" : "#ff882c",
      borderRadius: 15,
      elevation: 5,
    },
    wordAttempt: {
      opacity: 0.8,
      color: "white",
      borderRadius: 100,
      justifyContent: "center",
      textAlign: "center",
      fontSize: dime > 500 ? dime * 0.06 : dime * 0.08,
      fontFamily: "GurbaniAkharSG",
    },
    backspace: {
      textAlign: "center",
      alignSelf: "center",
      justifyContent: "center",
      fontSize: dime > 500 ? dime * 0.035 : dime * 0.05,
      padding: 8,
    },
  });

  const refresh = () => {
    dispatch(setAttempt(""));
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {state.attempt !== "" ? (
        maxLength() < state.attempt.length ? (
          <Animatable.View
            animation="flash"
            duration={1000}
            iterationCount={3}
            onAnimationEnd={() => {
              refresh();
            }}
            style={styles.wordAttemptView}
          >
            <Text style={styles.wordAttempt}>{gurmukhi(state.attempt)}</Text>
          </Animatable.View>
        ) : (
          <View style={{ ...styles.wordAttemptView }}>
            <Text style={styles.wordAttempt} selectable>
              {gurmukhi(state.attempt)}
            </Text>
            <IconM
              name="backspace"
              color="white"
              style={styles.backspace}
              onPress={() => {
                dispatch(setAttempt(state.attempt.slice(0, -1)));
              }}
            />
            {/* <TouchableOpacity
                    style={{ padding: 10}}
                    onPress={() => {dispatch(setAttempt(state.attempt.slice(0,-1)))}}
                  >
                  <Icon
                    name="backspace"
                    color={'white'}
                    size={width*0.05}/>
                  </TouchableOpacity> */}
            {/* <Text style={{...styles.wordAttempt, paddingEnd:75*(width/height)}}>
                  {Anvaad.unicode(state.attempt)}
                </Text>
                <IconM name="backspace"
                  color={"white"}
                  size={width*0.055}
                  style={{
                      position: 'absolute',
                      right:0, alignSelf:'center',
                      justifyContent:'flex-end',
                      padding: 10
                  }}
                  onPress={() => {dispatch(setAttempt(state.attempt.slice(0,-1)))}} /> */}
          </View>
        )
      ) : null}
    </View>
  );
};

export default AttemptInput;
