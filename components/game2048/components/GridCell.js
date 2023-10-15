import { View, Dimensions } from "react-native";
import React from "react";
import * as Platform from "../../../util/orientation";

const GridCell = () => {
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

  const MARGIN_WIDTH = dimeMin * 0.01;
  const ITEM_WIDTH = (dimeMin * (Platform.isTablet() ? 0.6 : 0.8) - MARGIN_WIDTH * 10) / 4;

  const styles = {
    container: {
      width: ITEM_WIDTH,
      height: ITEM_WIDTH,
      marginHorizontal: MARGIN_WIDTH,
      marginVertical: MARGIN_WIDTH,
      backgroundColor: "#0005", // 'rgba(238, 228, 218, 0.35)',
      borderRadius: dimeMin * 0.02,
    },
  };

  return <View style={styles.container} />;
};

export default GridCell;
