import * as React from "react";
import { View, StyleSheet, ActivityIndicator, Modal, Text } from "react-native";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import theColors from "../../../util/colors";

const LoadingModal = ({ visible, theText }) => {
  const state = useSelector((theState) => theState.theGameReducer);

  let colors;
  if (state === undefined) {
    colors = theColors.false;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "10%",
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: colors.loadingScreen.container,
    },
    msg: {
      fontSize: 25,
      textAlign: "center",
    },
  });
  return (
    <Modal visible={visible} animationType="fade" presentationStyle="overFullScreen">
      <View style={styles.container}>
        <Text style={styles.msg}>ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ||</Text>
        <ActivityIndicator size="large" color="blue" disable="disabled" animating />
        <Text style={styles.msg}>{theText}</Text>
      </View>
    </Modal>
  );
};

LoadingModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  theText: PropTypes.string.isRequired,
};

export default LoadingModal;
