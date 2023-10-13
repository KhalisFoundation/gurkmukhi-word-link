/* eslint-disable react/destructuring-assignment */
import * as React from "react";
import { StyleSheet, Modal, Text, TouchableOpacity, Animated, View } from "react-native";
import { useFonts } from "expo-font";

import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";
import dimensions from "../../util/dimensions";
import Icon from "../../assets/Group-14.svg";
import Win from "../../assets/Win.svg";

const YouWonModal = (props) => {
  const { width } = dimensions;
  const [fontsLoaded] = useFonts({
    Bookish: require("../../assets/fonts/Bookish.ttf"),
    Mochy: require("../../assets/fonts/Mochy.ttf"),
    Muli: require("../../assets/fonts/Muli.ttf"),
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 25,
      paddingTop: 100,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    wordBox: {
      backgroundColor: "#FF7E00",
      borderRadius: 14,
      margin: 10,
      padding: 10,
      shadowColor: "#fff",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    continue: {
      flexDirection: "row",
      justifyContent: "center",
    },
    continueText: {
      textAlign: "center",
      fontSize: width * 0.04,
      margin: "auto",
      fontFamily: "Muli",
      color: "black",
    },
    text: {
      textAlign: "center",
      fontSize: width * 0.07,
      color: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
      paddingTop: 25,
      fontFamily: "Bookish",
    },
    inner: { width: "100%", borderRadius: 30, backgroundColor: "#274C7C" },
    tada: {
      marginBottom: props.won ? 0 : 25,
      alignItems: "center",
    },
    muli: { fontFamily: "Muli", fontWeight: "normal", fontSize: width * 0.05 },
    negMargin75: { marginTop: -75 },
  });
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Modal animationType="fade" transparent>
      <Animatable.View animation="slideInDown" iterationCount={1} style={styles.container}>
        <View style={styles.inner}>
          <Animatable.View animation="tada" iterationCount={2} style={styles.tada}>
            {props.won ? (
              <Win height={2 * dimensions.size["60"]} style={styles.negMargin75} />
            ) : (
              <Icon style={{ transform: [{ scale: 2 }] }} />
            )}
          </Animatable.View>
          <Text style={styles.text}>{props.won ? "vDweIAwN jI!" : "koeI g~l nhIN!"}</Text>
          <Text style={[styles.text, styles.muli]}>
            {props.won ? "You Won!" : "No Problem!\nBetter Luck Next Time!"}
          </Text>
          <Animatable.View animation="slideInDown" iterationCount={1}>
            <TouchableOpacity style={styles.continue} onPress={props.onRestart}>
              <AnimatedLinearGradient
                colors={["#f0cb35", "#ed8f03"]}
                start={{ x: 0.9, y: 1.5 }}
                style={styles.wordBox}
              >
                <Text style={styles.continueText}>Play Again</Text>
              </AnimatedLinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </Animatable.View>
    </Modal>
  );
};

YouWonModal.propTypes = {
  won: PropTypes.bool.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default YouWonModal;
