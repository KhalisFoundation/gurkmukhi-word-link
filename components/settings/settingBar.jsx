import * as React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, BottomSheet } from "react-native-elements";
import { useDispatch } from "react-redux";
import MaskedView from "@react-native-community/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";

const SettingsBar = ({ theSetting, imageSource, theList, theAction }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentSetting, setCurrentSetting] = React.useState("Wanna reset the game?");

  // const state = useSelector((theState) => theState);
  const styles = StyleSheet.create({
    titleText: {
      color: "black",
    },
    shadow: {
      shadowColor: "black",
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
  });
  const allImages = {
    reload: "reload",
  };
  const list = theList.map((theTitle) => ({
    title: String(theTitle),
    onPress: () => {
      setCurrentSetting(String(theTitle));
      setIsVisible(false);
      dispatch(theAction(theTitle));
    },
  }));

  list.push({
    title: "Cancel",
    containerStyle: { backgroundColor: "red" },
    titleStyle: { color: "white" },
    onPress: () => setIsVisible(false),
  });
  // dispatch(theAction(currentSetting));
  // why does this cause it it craxh
  return (
    <View style={styles.container}>
      <ListItem
        key={theSetting}
        containerStyle={[styles.titleText, { alignItems: "flex-start" }]}
        onPress={() => {
          setIsVisible(
            (prev) =>
              // sets isVisible to true
              !prev
          );
        }}
        bottomDivider
      >
        <MaskedView
          style={{ width: 35, height: 35 }}
          maskElement={
            <View
              style={{
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name={allImages[imageSource]} size={35} color="#464646" style={styles.shadow} />
            </View>
          }
        >
          <LinearGradient colors={["#FF0076", "#590FB7"]} style={{ flex: 1 }} />
        </MaskedView>
        <ListItem.Content>
          <ListItem.Title>{theSetting}</ListItem.Title>
          <ListItem.Subtitle style={{ color: "#a3a3a3" }}>{currentSetting}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>

      <BottomSheet
        modalProps={{
          animationType: "slide",
          visible: isVisible,
          backgroundColor: "blue",
          transparent: true,
          onRequestClose: () => {
            setIsVisible((prev) => !prev);
          },
        }}
        // containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
      >
        {list.map((item) => (
          <ListItem key={item.title} containerStyle={item.containerStyle} onPress={item.onPress}>
            <ListItem.Content>
              <ListItem.Title style={item.titleStyle}>{item.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
};

SettingsBar.propTypes = {
  theSetting: PropTypes.string.isRequired,
  imageSource: PropTypes.string.isRequired,
  theList: PropTypes.shape().isRequired,
  theAction: PropTypes.func.isRequired,
};

export default SettingsBar;
