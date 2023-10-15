import { View, Dimensions } from "react-native";
import React from "react";

import GridCell from "./GridCell";

import dimensions from "../../../util/dimensions";
import * as Platform from "../../../util/orientation";

const GridRow = () => {
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

  const MARGIN_WIDTH = dimensions.size["2"];
  const ITEM_WIDTH = (dimeMin * (Platform.isTablet() ? 0.6 : 0.8) - MARGIN_WIDTH * 10) / 4;

  const styles = {
    container: {
      height: ITEM_WIDTH,
      marginVertical: MARGIN_WIDTH,
      flexDirection: "row",
    },
  };

  return (
    <View style={styles.container}>
      <GridCell />
      <GridCell />
      <GridCell />
      <GridCell />
    </View>
  );
};

export default GridRow;
