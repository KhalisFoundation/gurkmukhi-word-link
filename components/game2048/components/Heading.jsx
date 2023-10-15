/* eslint-disable react/destructuring-assignment */
import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import dimensions from "../../../util/dimensions";

const Heading = (props) => {
  const state = useSelector((theState) => theState);
  const [fontsLoaded] = useFonts({
    Muli: require("../../../assets/fonts/Muli.ttf"),
    GurbaniAkhar: require("../../../assets/fonts/GurbaniAkharSG.ttf"),
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
  });

  const styles = StyleSheet.create({
    container: {
      justifyContent: "space-around",
      flexDirection: "row",
      width: dimeMin,
    },
    upBox: {
      backgroundColor: "#035",
      padding: dimensions.size["4"],
      borderRadius: 50,
      alignSelf: "center",
      alignItems: "center",
    },
    upText: {
      color: "white",
      fontSize: dimeMin * 0.04,
      fontFamily: "Muli",
    },
    numText: {
      fontFamily: state.punjabiNums ? "GurbaniAkhar" : "Muli",
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.upBox}>
        <Text style={styles.upText}>
          Best: <Text style={styles.numText}>{props.best}</Text>
        </Text>
      </View>
      <View style={styles.upBox}>
        <Text style={styles.upText}>
          Score: <Text style={styles.numText}>{props.score}</Text>
        </Text>
      </View>
    </View>
  );
};

Heading.propTypes = {
  best: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default Heading;
