/* eslint-disable react/forbid-prop-types */
import { View, Dimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import Tile from "./Tile";
import * as Platform from "../../../util/orientation";

const TileContainer = ({ tiles }) => {
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
    },
  };

  return (
    <View style={styles.container}>
      {tiles.map((item) => (
        <Tile
          x={item.x}
          y={item.y}
          value={item.value}
          key={item.prog}
          previousPosition={item.previousPosition || null}
        />
      ))}
    </View>
  );
};

TileContainer.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TileContainer;
