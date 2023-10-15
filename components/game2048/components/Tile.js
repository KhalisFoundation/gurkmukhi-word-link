/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/sort-comp */
import { StyleSheet, Animated, Dimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import NumText from "./NumText";
import dimensions from "../../../util/dimensions";
import * as Platform from "../../../util/orientation";

const screen = Dimensions.get("window");
let dimeMin = Math.min(screen.width, screen.height);

let MARGIN_WIDTH = dimeMin * 0.01;
let ITEM_WIDTH = (dimeMin * (Platform.isTablet() ? 0.6 : 0.8) - MARGIN_WIDTH * 10) / 4;

const styles = StyleSheet.create({
  tile: {
    position: "absolute",
    borderRadius: dimeMin * 0.02,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: MARGIN_WIDTH,
    borderColor: "#0005",
    borderWidth: dimensions.size["1"] / 2,
  },
  tileText: {
    fontSize: dimeMin * 0.5,
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
  },
});

const colorCodes = {
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#edcf72",
  256: "#edcc61",
  512: "#edc850",
  1024: "#edc53f",
  2048: "#edc22e",
};

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    };
  }

  componentWillMount() {
    this.aimatedScale = new Animated.Value(0.1);
  }

  componentDidMount() {
    Dimensions.addEventListener("change", () => {
      this.setState({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      });
    });
    dimeMin = Math.min(this.state.width, this.state.height);
    MARGIN_WIDTH = dimeMin * 0.01;
    ITEM_WIDTH = (dimeMin * (Platform.isTablet() ? 0.6 : 0.8) - MARGIN_WIDTH * 10) / 4;

    Animated.spring(this.aimatedScale, {
      // tension: 80,
      // friction: 15,
      velocity: 30,
      // bounciness: 16,
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    this.isHorizontalMove = nextProps.x !== this.props.x;
    const fromVal =
      (this.isHorizontalMove ? this.props.x : this.props.y) * (ITEM_WIDTH + MARGIN_WIDTH * 2) +
      MARGIN_WIDTH * 2;
    this.aimationValue = new Animated.Value(fromVal);
  }

  componentDidUpdate() {
    Dimensions.addEventListener("change", () => {
      this.setState({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      });
    });
    // change style whenever this happens
    dimeMin = Math.min(this.state.width, this.state.height);
    MARGIN_WIDTH = dimeMin * 0.01;
    ITEM_WIDTH = (dimeMin * (Platform.isTablet() ? 0.6 : 0.8) - MARGIN_WIDTH * 10) / 4;
    styles.tile = {
      ...styles.tile,
      borderRadius: dimeMin * 0.02,
      marginVertical: MARGIN_WIDTH,
    };
    styles.tileText = {
      ...styles.tileText,
      fontSize: dimeMin * 0.5,
    };

    Animated.timing(this.aimationValue, {
      // easing: Easing.back(),
      duration: 150,
      useNativeDriver: false,
      toValue:
        (this.isHorizontalMove ? this.props.x : this.props.y) * (ITEM_WIDTH + MARGIN_WIDTH * 2) +
        MARGIN_WIDTH * 2,
    }).start();
  }

  render() {
    const tilePositionStyle = {
      left:
        this.props.previousPosition && this.isHorizontalMove
          ? this.aimationValue
          : this.props.x * (ITEM_WIDTH + MARGIN_WIDTH * 2) + MARGIN_WIDTH * 2,
      top:
        this.props.previousPosition && !this.isHorizontalMove
          ? this.aimationValue
          : this.props.y * (ITEM_WIDTH + MARGIN_WIDTH * 2) + MARGIN_WIDTH * 2,
      width: ITEM_WIDTH,
      height: ITEM_WIDTH,
    };

    const animatedScaleStyle = {
      transform: [{ scale: this.aimatedScale }],
      ...styles.tileText,
    };

    return (
      <Animated.View
        style={[styles.tile, { backgroundColor: colorCodes[this.props.value] }, tilePositionStyle]}
      >
        <Animated.Text style={animatedScaleStyle}>
          <NumText num={this.props.value} />
        </Animated.Text>
      </Animated.View>
    );
  }
}

Tile.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  previousPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};

export default Tile;
