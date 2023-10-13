import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import Game from "./screens/game/index.tsx";
import { store } from "./store/index.ts";

const Wordle = ({ navigation }) => {
  return (
    <Provider store={store}>
      <Game navigation={navigation} />
    </Provider>
  );
};

Wordle.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Wordle;
