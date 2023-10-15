import * as React from "react";
import { View, TouchableOpacity, StyleSheet, Linking, StatusBar, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";

import { LinearGradient } from "expo-linear-gradient";
import * as Platform from "../../util/orientation";
import Khalis from "../../assets/khalis_incubator_dark.svg";
import Logo from "../../assets/akhar_logo.svg";
import Button from "../Button";
// import { fetchData, setData } from '../../redux/actions';

// const audioPlayer = new Audio.Sound();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const MenuScreen = ({ navigation }) => {
  // const dispatch = useDispatch();
  // const state = useSelector((theState) => theState);
  // const [isLoaded, setIsLoaded] = React.useState(false);
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });

  const isPortrait = () => localState.width < localState.height;
  const isTablet = () => localState.devicetype === "tablet";
  // Event Listener for orientation changes
  Dimensions.addEventListener("change", () => {
    setLocalState({
      orientation: isPortrait() ? "portrait" : "landscape",
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    });
  });

  const dime = Math.min(localState.width, localState.height);

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);

  // const [data, setLocalData] = React.useState(null);

  // const getDataFromAsyncStorage = React.useCallback(async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('data');
  //     setLocalData(value);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   getDataFromAsyncStorage();
  // }, [getDataFromAsyncStorage]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      width: "100%",
      // backgroundColor: "#274C7C",
    },
    header: {
      width: isPortrait() ? "100%" : "50%",
      flexWrap: "wrap",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      justifyContent: isPortrait() ? "space-between" : "center",
    },
    upper: {
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
    },
    lower: {
      width: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      paddingHorizontal: 20,
      marginTop: isPortrait() ? -50 : 0,
    },
    mainmenu: {
      color: "#fff",
      fontSize: dime * 0.06,
      fontFamily: "Muli",
      textAlign: "center",
      justifyContent: "center",
    },
    mainMenuContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderBottomColor: isPortrait() ? "#00E9FE" : "transparent",
      borderBottomWidth: 1,
    },
    text: {
      color: "#fff",
      fontSize: isTablet() ? dime * 0.04 : dime * 0.045,
      fontFamily: "Muli",
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 1,
      margin: 10,
    },
    text2048: {
      color: "#fff",
      fontSize: isTablet() ? dime * 0.04 : dime * 0.045,
      fontFamily: "Bookish",
      alignSelf: "center",
      margin: 10,
    },
    item: {
      backgroundColor: "#FF7E00",
      borderRadius: 10,
      margin: 10,
      width: "75%",
      shadowColor: "#EDD7C6",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 1,
      shadowRadius: 0.5,
      elevation: 5,
    },
    menulogo: {
      resizeMode: "contain",
      alignSelf: "center",
      margin: 15,
    },
    columns: {
      flexDirection: isPortrait() ? "column" : "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
    },
    khalisTouchableOpacity: {
      alignItems: "center",
      marginVertical: 10,
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <LinearGradient
      colors={["#330867", "#304877"]}
      style={{
        flex: 1,
        width: localState.width,
        height: localState.height,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <View style={styles.header}>
          <View style={styles.upper}>
            <Logo height="55%" width="70%" style={styles.menulogo} />
            {/* <View style={styles.mainMenuContainer}>
            {/* <Text style={styles.mainmenu}>MAIN MENU</Text> 
            <TouchableOpacity onPress={()=> {dispatch(showIntroModal())}} style={{margin: 5}}>
            <Icon name='info-circle' color={"#7FC8DE"} size={22} />
          </TouchableOpacity> 
          </View> */}
          </View>
          <View style={styles.lower}>
            {/* <Text style={styles.text}>Select a game to Play</Text> */}
            <View style={styles.columns}>
              <Button
                gameId="akhar_jor"
                navigation={navigation}
                text="Practice Words"
                btnStyle={styles.item}
                textStyle={styles.text}
              />
            </View>
            <View style={styles.columns}>
              <Button
                gameId="2048"
                navigation={navigation}
                text="Practice Numbers"
                btnStyle={styles.item}
                textStyle={styles.text}
              />
            </View>
            <View style={styles.columns}>
              <Button
                gameId="wordle"
                navigation={navigation}
                text="Punjabi Wordle"
                btnStyle={styles.item}
                textStyle={styles.text}
              />
            </View>
            <TouchableOpacity
              style={styles.khalisTouchableOpacity}
              onPress={() => Linking.openURL("https://khalis.dev")}
            >
              <Khalis width="50%" height={dime * 0.2} />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.columns}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              // if (audioPlayer._loaded) {stopSound()};
              whichGame('wordle');
              navigation.navigate('Wordle');
            }}
          >
            <Text style={styles.text}>Wordle</Text>
          </TouchableOpacity>
        </View> */}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

MenuScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default MenuScreen;
