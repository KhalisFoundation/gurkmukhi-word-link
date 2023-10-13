/* eslint-disable react/destructuring-assignment */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setPunjabiNums } from "../../../redux/actions";
import dimensions from "../../../util/dimensions";

const BelowGame = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);

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
      flexDirection: "row",
      justifyContent: "space-around",
      width: dimeMin,
      paddingTop: dimensions.size["2"],
    },
    otherScreens: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      padding: dimensions.size["2"],
      paddingRight: 10,
      borderRadius: 15,
    },
    optText: {
      textAlign: "center",
      color: "#002f63",
      fontFamily: "Muli",
      alignSelf: "center",
      fontSize: dimeMin * 0.05,
      paddingStart: dimensions.size["2"],
      // textShadowColor: (state.darkMode) ? 'white' : 'black',
      // textShadowOffset: {
      //   width: 0.5,
      //   height: 0.5
      // },
      // textShadowRadius: Dimensions.size["1"],
    },
    icon: {
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
    },
    box: { flexDirection: "row" },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onRestart} style={styles.box}>
        <View style={styles.otherScreens}>
          <View style={styles.icon}>
            <IonIcons name="reload" size={dimeMin * 0.055} color="#274C77" style={styles.shadow} />
          </View>
          <Text style={styles.optText}>Reset</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          dispatch(setPunjabiNums(!state.punjabiNums));
        }}
      >
        <View style={styles.otherScreens}>
          <View style={styles.icon}>
            <IonIcons
              name="globe-outline"
              size={dimeMin * 0.055}
              color="#274C77"
              style={styles.shadow}
            />
          </View>
          <Text style={styles.optText}>Language</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

BelowGame.propTypes = {
  onRestart: PropTypes.func.isRequired,
};

export default BelowGame;
