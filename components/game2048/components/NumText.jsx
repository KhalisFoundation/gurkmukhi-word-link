import { useSelector } from "react-redux";
import { Text, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import * as React from "react";
import * as Anvaad from "anvaad-js";
import AppLoading from "expo-app-loading";
import PropTypes from "prop-types";

const NumText = ({ num }) => {
  const state = useSelector((theState) => theState.theGameReducer);
  const [fontsLoaded] = useFonts({
    GurbaniHeavy: require("../../../assets/fonts/GurbaniAkharHeavySG.ttf"),
    Muli: require("../../../assets/fonts/Muli.ttf"),
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

  const styles = {
    textAlign: "center",
    color: "#002f63",
    fontFamily: state.punjabiNums ? "GurbaniHeavy" : "Muli",
    fontSize: num >= 128 ? dimeMin * 0.05 : dimeMin * 0.07,
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Text
      style={{
        ...styles,
      }}
    >
      {state.punjabiNums ? Anvaad.unicode(num) : num}
    </Text>
  );
};

NumText.propTypes = {
  num: PropTypes.number.isRequired,
};

export default NumText;
