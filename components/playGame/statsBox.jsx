import * as React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Plus from "../icons/Plus";
import Hint from "../icons/Hint";
import Medal from "../icons/Medal";

const StatsBox = ({ stat, navigation }) => {
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

  const items = {
    levels: {
      name: "Level",
      icon: "shield",
      color: "yellow",
      value: state.levelProgress[0].level,
    },
    hints: {
      name: "Hints",
      icon: "lightbulb-on",
      color: "orange",
      value: state.giveUpsLeft,
    },
  };

  const item = items[stat];
  const styles = StyleSheet.create({
    upBox: {
      backgroundColor: "rgba(255, 255, 255, 0.29)",
      flexDirection: "row",
      height: dime * 0.08,
      width: dime * 0.25,
      alignItems: "center",
      borderRadius: 10,
      paddingHorizontal: dime * 0.02,
      justifyContent: "space-evenly",
    },
    upText: {
      color: "white",
      fontSize: dime * 0.035,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.upBox}>
      {stat === "levels" ? (
        <Medal size={dime * 0.05} />
      ) : (
        // <EnIcon name={item.icon} size={dime * 0.05} color={item.color} />
        <Hint size={dime * 0.05} />
        // <IconM name={item.icon} size={dime * 0.05} color={item.color} />
      )}
      <Text style={styles.upText}>
        {item.name === "Level" ? `${item.name} ${item.value}` : `${item.value}`}
      </Text>
      {item.name === "Hints" ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("giveUps", { prevScreen: 1 });
          }}
        >
          <Plus size={dime * 0.05} />
          {/* <IconM name="plus-circle" size={dime * 0.05} color="#06FF00" /> */}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

StatsBox.propTypes = {
  stat: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default StatsBox;
