import * as React from "react";
import { View, Text, StyleSheet, StatusBar, Linking, ScrollView, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from "react-native-elements";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaskedView from "@react-native-community/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import * as Analytics from "expo-firebase-analytics";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";
import * as Platform from "../../util/orientation";
import { setShowPopUp, setShowRomanised, reset } from "../../redux/actions";

// TODO - Move all colors to separate file and import as variables.
import SwitchBar from "./settingBarSwitch";
// import theColors from '../../util/colors';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState);
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

  // const colors = theColors.false;
  // const platform = Platform.OS;
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      // justifyContent: "center",
      backgroundColor: "#eeccaa",
      width: "100%",
      height: "100%",
    },
    headerStyle: {
      color: "#274CCC",
      fontFamily: "Muli",
      fontWeight: "600",
      fontSize: Platform.isTablet() ? dime * 0.034 : dime * 0.0425,
    },
    header: {
      width: screen.width,
      height: Platform.isTablet() ? dime * 0.12 : dime * 0.175,
      backgroundColor: "orange",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      elevation: 5,
    },
    headerContent: {
      width: "90%",
      height: Platform.isTablet() ? dime * 0.1 : dime * 0.175,
      backgroundColor: "orange",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      elevation: 5,
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
    scroll: {
      width: screen.width,
      height: "100%",
    },
    listText: {
      fontSize: Platform.isTablet() ? dime * 0.03 : dime * 0.04,
    },
    titleText: {
      backgroundColor: "#fff",
      paddingHorizontal: localState.orientation === "portrait" ? null : "5%",
    },
    absLeft: { position: "absolute", left: 10 },
    flex1: { flex: 1 },
    alignSelfCenter: { alignSelf: "center" },
    alignItemsStart: { alignItems: "flex-start" },
  });

  const resetGame = async () => {
    await Analytics.logEvent("setting_used", { setting: "reset" });
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="orange" barStyle="dark-content" />
      <View style={styles.header}>
        <IonIcons
          name="chevron-back"
          color="black"
          size={Platform.isTablet() ? dime * 0.05 : dime * 0.08}
          style={styles.absLeft}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text
          style={{
            color: "black",
            fontSize: Platform.isTablet() ? dime * 0.04 : dime * 0.05,
            fontFamily: "Muli",
            margin: 0,
          }}
        >
          Settings
        </Text>
      </View>

      {/* <SettingsBar theImage={} title={} data={}/> */}
      <ScrollView style={styles.scroll}>
        <View
          style={{
            width: "100%",
            height: Platform.isTablet() ? dime * 0.05 : dime * 0.07,
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          <Text style={styles.headerStyle}>App Options</Text>
        </View>
        {/* <SwitchBar
          title="dark_mode"
          theSetting="Dark Mode"
          theList={[true, false]}
          imageSource="khanda"
          theAction={setDarkMode} // setDarkMode toggles the darkMode
          theCurrentOptionIndex={[true, false].indexOf(state.darkMode)}
        /> */}
        <SwitchBar
          title="show_pop_up"
          theSetting="Show Pop Up after each word"
          theList={[true, false]}
          imageSource="ikOngkar"
          theAction={setShowPopUp}
          // setShowPopUp toggles the showing of pop up on level completion.
          theCurrentOptionIndex={[true, false].indexOf(state.showPopUp)}
        />
        <SwitchBar
          title="show_romanised"
          theSetting="Romanised words"
          theList={[true, false]}
          imageSource="ura"
          theAction={setShowRomanised} // setShowRomanised toggles the showing of romanised words.
          theCurrentOptionIndex={[true, false].indexOf(state.romanised)}
        />
        {/* <SwitchBar
          title="show_num_of_letters"
          theSetting="Indicate Number of Letters"
          theList={[true, false]}
          imageSource="letters"
          theAction={setShowNumOfLetters} // toggles the showing of number of letters in the word.
          theCurrentOptionIndex={[true, false].indexOf(state.showNumOfLetters)}
        />
        <SwitchBar
          title="include_matra"
          theSetting="Include Matras"
          theList={[true, false]}
          imageSource="matra"
          theAction={setIncludeMatra} // toggles the showing of matras in the word.
          theCurrentOptionIndex={[true, false].indexOf(state.includeMatra)}
          displayParam={state.showNumOfLetters}
        /> */}
        <ListItem
          containerStyle={[styles.titleText, styles.alignItemsStart]}
          onPress={() => {
            resetGame();
            dispatch(reset());
          }}
          bottomDivider
        >
          <MaskedView
            style={{ width: dime * 0.08, height: dime * 0.08 }}
            maskElement={
              <View
                style={{
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IonIcons name="reload" size={dime * 0.08} color="#464646" style={styles.shadow} />
              </View>
            }
          >
            <LinearGradient colors={["#274CCC", "#274C77"]} style={styles.flex1} />
          </MaskedView>
          <ListItem.Content style={styles.alignSelfCenter}>
            <ListItem.Title>
              <Text style={styles.listText}>Reset</Text>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <View
          style={{
            width: "100%",
            height: Platform.isTablet() ? dime * 0.05 : dime * 0.07,
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          <Text style={styles.headerStyle}>Other Options</Text>
        </View>
        <ListItem
          containerStyle={[styles.titleText, styles.alignItemsStart]}
          onPress={() => Linking.openURL("https://khalisfoundation.org/donate/")}
          bottomDivider
        >
          <MaskedView
            style={{ width: dime * 0.08, height: dime * 0.08 }}
            maskElement={
              <View
                style={{
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5Icons
                  name="donate"
                  size={dime * 0.08}
                  color="#464646"
                  style={styles.shadow}
                />
              </View>
            }
          >
            <LinearGradient colors={["#274CCC", "#274C77"]} style={styles.flex1} />
          </MaskedView>
          <ListItem.Content style={styles.alignSelfCenter}>
            <ListItem.Title>
              <Text style={styles.listText}>Donate</Text>
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="black" size={dime * 0.04} />
        </ListItem>
        <ListItem
          containerStyle={[styles.titleText, styles.alignItemsStart]}
          onPress={() => {
            navigation.navigate("about");
          }}
          bottomDivider
        >
          <MaskedView
            style={{ width: dime * 0.08, height: dime * 0.08 }}
            maskElement={
              <View
                style={{
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcons
                  name="question-circle"
                  size={dime * 0.08}
                  color="#464646"
                  style={styles.shadow}
                />
              </View>
            }
          >
            <LinearGradient colors={["#274CCC", "#274C77"]} style={styles.flex1} />
          </MaskedView>
          <ListItem.Content style={styles.alignSelfCenter}>
            <ListItem.Title>
              <Text style={styles.listText}>About</Text>
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="black" size={dime * 0.04} />
        </ListItem>
      </ScrollView>
    </SafeAreaView>
  );
};

Settings.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Settings;
