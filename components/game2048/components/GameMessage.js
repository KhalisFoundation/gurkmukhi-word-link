/* eslint-disable react/destructuring-assignment */
import { View, Dimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import YouWonModal from "../resultModal";

const { height, width } = Dimensions.get("window");

const GameMessage = (props) => {
  const containerStyle = props.won || props.over ? { width, height } : { width: 0, height: 0 };
  if (props.won) {
    return <YouWonModal style={containerStyle} won={props.won} onRestart={props.onTryAgain} />;
  }
  if (props.over) {
    return <YouWonModal style={containerStyle} won={props.won} onRestart={props.onTryAgain} />;
  }
  return <View />;
};

GameMessage.propTypes = {
  won: PropTypes.bool.isRequired,
  over: PropTypes.bool.isRequired,
  onTryAgain: PropTypes.func.isRequired,
};

export default GameMessage;
