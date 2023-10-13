/* eslint-disable no-console */
import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import IonIcons from "react-native-vector-icons/Ionicons";
import EnIcon from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import PropTypes from "prop-types";
import * as Platform from "../../util/orientation";
import { setTheState, openHelpModal } from "../../redux/actions";
import Help from "../playGame/help";
import { initialState } from "../../redux/reducers";

import dimensions from "../../util/dimensions";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Arial: require("../../assets/fonts/Arial.ttf"),
    GurbaniHeavy: require("../../assets/fonts/GurbaniAkharHeavySG.ttf"),
    Bookish: require("../../assets/fonts/Bookish.ttf"),
    Prabhki: require("../../assets/fonts/Prabhki.ttf"),
    Mochy: require("../../assets/fonts/Mochy.ttf"),
    Muli: require("../../assets/fonts/Muli.ttf"),
    Nasa: require("../../assets/fonts/Nasalization.otf"),
  });
  const state = useSelector((theState) => theState.theGameReducer);

  const { width, height } = dimensions;
  const [localState, setLocalState] = React.useState({
    orientation: Platform.isPortrait() ? "portrait" : "landscape",
    devicetype: Platform.isTablet() ? "tablet" : "phone",
  });

  // Event Listener for orientation changes
  Dimensions.addEventListener("change", () => {
    setLocalState({
      orientation: Platform.isPortrait() ? "portrait" : "landscape",
    });
  });

  const dime = Math.min(width, height);
  let theState;
  React.useEffect(() => {
    const getData = async () => {
      try {
        const theStringState = await AsyncStorage.getItem("state");
        if (theStringState !== null) {
          theState = JSON.parse(theStringState);
          if (theState.ALL_WORDS.levels === undefined) {
            theState = initialState;
          }
          console.log("got state that was previously saved");
        } else {
          console.log("there is nothing is state");
          theState = initialState;
        }
        dispatch(setTheState(theState));
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    };
    getData();
  }, [dispatch]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#162b5e",
      padding: 10,
      paddingHorizontal: 20,
    },
    content: {
      justifyContent: localState.orientation === "portrait" ? "space-evenly" : "space-between",
      height: localState.orientation === "portrait" ? "100%" : "80%",
      width: "100%",
    },
    playTouchableOpacity: {
      width: "50%",
      alignSelf: "center",
      alignItems: "center",
      borderRadius: 15,
      marginBottom: 15,
      elevation: 5,
      backgroundColor: "#FF7E00",
    },
    play: {
      fontSize: Platform.isTablet() ? dime * 0.05 : dime * 0.07,
      fontFamily: "Nasa",
      color: "#fff",
      textAlign: "center",
      marginVertical: 10,
      // textShadowOffset: {width: 2, height: 2},
      // textShadowRadius: 10,
      // textShadowColor: 'darkblue',
    },
    otherScreens: {
      flexDirection: "row",
      // backgroundColor: "yellow",
      alignItems: "center",
      justifyContent: "space-between",
    },
    otherScreenTouchableOpacity: {
      flex: 1,
      margin: 10,
    },
    center: {
      alignSelf: "center",
    },
    menuText: {
      fontSize: Platform.isTablet() ? dime * 0.03 : dime * 0.045,
      alignSelf: "center",
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {state.helpPage ? <Help /> : null}
      {/* <LoadingModal visible={loadingScreenStatus} /> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 5,
          marginTop: 5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
          <IonIcons
            name="chevron-back"
            size={Platform.isTablet() ? dime * 0.05 : dime * 0.07}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("settings");
          }}
          style={{ padding: 5 }}
        >
          <Icon
            name="cog"
            size={Platform.isTablet() ? dime * 0.05 : dime * 0.07}
            color="#ccc"
            style={styles.center}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View
          style={{
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Bookish",
              fontSize: Platform.isTablet() ? dime * 0.1 : dime * 0.14,
              color: "#cdff",
            }}
          >
            AKr joV
          </Text>
          <Text
            style={{
              fontFamily: "Nasa",
              fontSize: dime * 0.07,
              color: "#cdff",
            }}
          >
            {Platform.OS === "ios" ? "Akhar Jor" : "Gurmukhi Wordlink"}
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          {/* PLay transition */}
          <TouchableOpacity
            style={styles.playTouchableOpacity}
            onPress={() => {
              navigation.navigate("play");
            }}
          >
            <Text style={styles.play}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(openHelpModal());
            }}
            testID="help-button"
          >
            <Text
              style={{
                ...styles.play,
                fontFamily: "Muli",
                fontSize: Platform.isTablet() ? dime * 0.04 : dime * 0.05,
                textDecorationStyle: "solid",
                textDecorationColor: "#fff",
                textDecorationLine: "underline",
              }}
            >
              How do I play?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherScreens}>
          <TouchableOpacity
            style={styles.otherScreenTouchableOpacity}
            onPress={() => {
              navigation.navigate("correctWords"); // how to pass params to other screen. We probaly won't need but there just for refrence
            }}
          >
            <EnIcon
              name="shield"
              size={Platform.isTablet() ? dime * 0.1 : dime * 0.15}
              color="yellow"
              style={styles.center}
            />
            <Text
              style={{
                ...styles.menuText,
                fontFamily: "Muli",
                fontWeight: "normal",
                color: "white",
                textAlign: "center",
              }}
            >
              Levels
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.otherScreenTouchableOpacity}
            onPress={() => {
              navigation.navigate("giveUps"); // how to pass params to other screen. We probaly won't need but there just for refrence
            }}
          >
            <Icon
              name="heart"
              size={Platform.isTablet() ? dime * 0.1 : dime * 0.15}
              color="#f55aff"
              style={styles.center}
            />
            <Text
              style={{
                ...styles.menuText,
                fontFamily: "Muli",
                fontWeight: "normal",
                color: "white",
              }}
            >
              Credits
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;
