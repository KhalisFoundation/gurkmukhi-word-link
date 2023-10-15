import * as React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import HintButton from "./hintButton";
import Help from "../icons/Help";
import { openHelpModal } from "../../redux/actions";

const Footer = ({ dispatch }) => {
  const state = useSelector((theState) => theState);

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
  });

  const styles = StyleSheet.create({
    upBox: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      width: "70%",
      justifyContent: "space-between",
    },
    upText: {
      color: "white",
      fontSize: dime * 0.035,
      fontWeight: "bold",
    },
    hintLayout: {
      backgroundColor: "transparent",
      flexDirection: "row",
      alignSelf: "center",
    },
  });

  return (
    <View style={styles.upBox}>
      <View style={styles.hintLayout}>
        {state.topWord.length !== state.firstLength ? (
          <HintButton wordType="top" />
        ) : (
          <HintButton wordType="bottom" />
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(openHelpModal());
        }}
      >
        <Help size={dime * 0.1} />
      </TouchableOpacity>
    </View>
  );
};

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Footer;
