import PropTypes from "prop-types";
import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 10,
    flexDirection: "row",
    borderRadius: 5,
    marginVertical: 10,
  },
  level: {
    height: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 2,
  },
  halfFilled: {
    backgroundColor: "#FF7E00",
    width: "50%",
  },
  levelFilled: {
    backgroundColor: "#FF7E00",
  },
});

const ProgressBar = ({ steps, currentStep }) => {
  const level = Math.floor((10 - currentStep.wordsNeeded) / 2) + 1;
  const progress = ((10 - currentStep.wordsNeeded) / steps) * 100;
  const isHalfFilled = (progress / 10) % 2 === 1;

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((l) => (
        <View key={l} style={[styles.level, l < level && styles.levelFilled]}>
          {l === level && isHalfFilled && (
            <View
              style={[
                styles.level,
                { marginHorizontal: 0 },
                l === level && isHalfFilled && styles.halfFilled,
                l < level && styles.levelFilled,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

ProgressBar.propTypes = {
  steps: PropTypes.number.isRequired,
  currentStep: PropTypes.shape({
    wordsNeeded: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProgressBar;
