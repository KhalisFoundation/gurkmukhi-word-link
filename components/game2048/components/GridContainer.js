import { View, Dimensions } from "react-native";
import React from "react";
import GridRow from "./GridRow";
import * as Platform from "../../../util/orientation";

const GridContainer = () => {
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
    container: {
      width: dimeMin * (Platform.isTablet() ? 0.6 : 0.8),
      height: dimeMin * (Platform.isTablet() ? 0.6 : 0.8),
      position: "absolute",
      left: 0,
      top: 0,
      overflow: "hidden",
      paddingHorizontal: dimeMin * 0.01,
      paddingVertical: dimeMin * 0.01,
      borderRadius: dimeMin * 0.02,
      flexDirection: "column",
      backgroundColor: "#FFB846", // 'rgba(238, 228, 218, 0.35)',
    },
  };

  return (
    <View style={styles.container}>
      <GridRow />
      <GridRow />
      <GridRow />
      <GridRow />
    </View>
  );
};

export default GridContainer;
