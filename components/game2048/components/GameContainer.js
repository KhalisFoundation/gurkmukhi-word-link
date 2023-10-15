/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/forbid-prop-types */
import { View, Dimensions } from "react-native";
import React, { Component } from "react";
import PropTypes from "prop-types";
import GridContainer from "./GridContainer";
import TileContainer from "./TileContainer";
import * as Platform from "../../../util/orientation";

const screen = Dimensions.get("screen");
let dimeMin = Math.min(screen.width, screen.height);

const styles = {
  container: {
    width: dimeMin * (Platform.isTablet() ? 0.6 : 0.8),
    height: dimeMin * (Platform.isTablet() ? 0.6 : 0.8),
    backgroundColor: "#bbada0",
    borderRadius: dimeMin * 0.02,
    marginTop: dimeMin * 0.03,
  },
};

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    };
  }

  componentDidMount() {
    Dimensions.addEventListener("change", () => {
      this.setState({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      });
    });

    dimeMin = Math.min(this.state.width, this.state.height);
    styles.container = {
      width: dimeMin * (Platform.isTablet() ? 0.6 : 0.8),
      height: dimeMin * (Platform.isTablet() ? 0.6 : 0.8),
      backgroundColor: "#bbada0",
      borderRadius: dimeMin * 0.02,
      marginTop: dimeMin * 0.03,
    };
  }

  // update everytime orientation changes
  componentDidUpdate() {
    Dimensions.addEventListener("change", () => {
      this.setState({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      });
    });

    dimeMin = Math.min(this.state.width, this.state.height);
    styles.container = {
      width: dimeMin * (Platform.isTablet() ? 0.6 : 0.8),
      height: dimeMin * (Platform.isTablet() ? 0.6 : 0.8),
      backgroundColor: "#bbada0",
      borderRadius: dimeMin * 0.02,
      marginTop: dimeMin * 0.03,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <GridContainer />
        <TileContainer tiles={this.props.tiles} />
      </View>
    );
  }
}

GameContainer.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GameContainer;
