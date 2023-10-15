import * as React from "react";
import { StyleSheet, View, StatusBar, TouchableOpacity, Dimensions, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaskedView from "@react-native-community/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Container from "./components/Container";
import dimensions from "../../util/dimensions";
import { open2048HelpModal } from "../../redux/actions";
import Help from "./components/help";
import * as Platform from "../../util/orientation";

const New2048 = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState);
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
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#274C7C",
      paddingHorizontal: localState.orientation === "portrait" ? dimensions.size["5"] : 0,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    icon: {
      backgroundColor: "transparent",
      alignItems: "center",
    },
    iconSize: { width: dimeMin * 0.075, height: dimeMin * 0.075 },
    flex: { flex: 1 },
    header: {
      justifyContent: "space-between",
      flexDirection: "row",
      width: dimeMin * 0.9,
      marginTop: 5,
    },
    p5: { padding: 5 },
  });

  const share = () => {
    Share.share(
      {
        message: `Hi! I'm playing 2048 on Akhar Games to learn Gurmukhi numerals. Join me!
      \nhttps://play.google.com/store/apps/details?id=com.khalisfoundation.gurmukhi_games`,
        title: "Akhar Games is a collection of games to help you learn Gurmukhi. Play now!",
      },
      {
        dialogTitle: "Share Akhar Games",
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {state.helpPage2048 ? <Help /> : null}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.p5} onPressOut={() => navigation.goBack()}>
          <MaskedView
            style={styles.iconSize}
            maskElement={
              <View style={styles.icon}>
                <IonIcons
                  name="chevron-back"
                  size={dimeMin * 0.075}
                  color="#464646"
                  style={styles.shadow}
                />
              </View>
            }
          >
            <LinearGradient colors={["#ff8008", "#ffc837"]} style={styles.flex} />
          </MaskedView>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={styles.p5}
            onPressOut={() => {
              dispatch(open2048HelpModal());
            }}
          >
            <MaskedView
              style={styles.iconSize}
              maskElement={
                <View style={styles.icon}>
                  <IonIcons
                    name="help"
                    size={dimeMin * 0.075}
                    color="#464646"
                    style={styles.shadow}
                  />
                </View>
              }
            >
              <LinearGradient colors={["#ff8008", "#ffc837"]} style={styles.flex} />
            </MaskedView>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.p5}
            onPressOut={() => {
              share();
            }}
          >
            <MaskedView
              style={styles.iconSize}
              maskElement={
                <View style={styles.icon}>
                  <IonIcons
                    name="share-social-outline"
                    size={dimeMin * 0.075}
                    color="#464646"
                    style={styles.shadow}
                  />
                </View>
              }
            >
              <LinearGradient colors={["#ff8008", "#ffc837"]} style={styles.flex} />
            </MaskedView>
          </TouchableOpacity>
        </View>
      </View>
      <Container startTiles={2} size={4} navigation={navigation} />
    </SafeAreaView>
  );
};

New2048.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default New2048;
