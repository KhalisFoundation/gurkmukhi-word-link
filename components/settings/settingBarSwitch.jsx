import * as React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { ListItem, Switch } from "react-native-elements";
import { useDispatch } from "react-redux";
import MaskedView from "@react-native-community/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Analytics from "expo-firebase-analytics";
import PropTypes from "prop-types";
import * as Platform from "../../util/orientation";

const SwitchBar = ({
  title,
  theSetting,
  imageSource,
  theList,
  theAction,
  theCurrentOptionIndex,
  displayParam = true,
}) => {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState({
    orientation: Platform.isPortrait() ? "portrait" : "landscape",
    devicetype: Platform.isTablet() ? "tablet" : "phone",
  });

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
    setLocalState({
      orientation: Platform.isPortrait() ? "portrait" : "landscape",
    });
  });

  // const state = useSelector((theState) => theState.theGameReducer);
  const styles = StyleSheet.create({
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
    khanda: "brightness-high",
    ikOngkar: "cards-outline",
    ura: "alphabetical",
    letters: "counter",
    matra: "image-filter-tilt-shift",
  };
  // const [isVisible, setIsVisible] = React.useState(false);
  const [currentSetting, setCurrentSetting] = React.useState(theList[theCurrentOptionIndex]);
  if (String(currentSetting) === "false") {
    allImages.khanda = "brightness-5";
  } else {
    allImages.khanda = "brightness-2";
  }

  const settingUsed = async (setup) => {
    await Analytics.logEvent("setting_used", { setting_used: setup });
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: screen.width,
        alignItems: "center",
      }}
    >
      <ListItem
        key={theSetting}
        containerStyle={[
          styles.titleText,
          {
            alignItems: "center",
            width: localState.orientation === "portrait" ? "100%" : "90%",
          },
          displayParam ? null : { display: "none" },
        ]}
        bottomDivider
      >
        <MaskedView
          style={{
            width: dime * 0.08,
            height: dime * 0.08,
            alignSelf: "center",
          }}
          maskElement={
            <View
              style={{
                backgroundColor: "transparent",
              }}
            >
              <Icon
                name={allImages[imageSource]}
                size={Platform.isTablet() ? dime * 0.06 : dime * 0.08}
                color="#000"
                style={styles.shadow}
              />
            </View>
          }
        >
          <LinearGradient colors={["#274CCC", "#274C77"]} style={{ flex: 1 }} />
        </MaskedView>
        <ListItem.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ListItem.Content
            style={{
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginEnd: 10,
            }}
          >
            <ListItem.Title>
              <Text
                style={{
                  fontSize: Platform.isTablet() ? dime * 0.03 : dime * 0.04,
                }}
              >
                {theSetting}
              </Text>
            </ListItem.Title>
            <Switch
              value={currentSetting}
              onValueChange={(newSetting) => {
                dispatch(theAction(newSetting));
                setCurrentSetting(newSetting);
                settingUsed(`${title} set to ${newSetting ? "on" : "off"}`);
              }}
              style={{
                transform: [
                  {
                    scaleX: Platform.isTablet() ? dime * 0.0015 : dime * 0.002,
                  },
                  {
                    scaleY: Platform.isTablet() ? dime * 0.0015 : dime * 0.002,
                  },
                ],
              }}
            />
          </ListItem.Content>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

SwitchBar.propTypes = {
  title: PropTypes.string.isRequired,
  theSetting: PropTypes.string.isRequired,
  imageSource: PropTypes.string.isRequired,
  theList: PropTypes.arrayOf(PropTypes.string).isRequired,
  theAction: PropTypes.func.isRequired,
  theCurrentOptionIndex: PropTypes.number.isRequired,
  displayParam: PropTypes.bool,
};

SwitchBar.defaultProps = {
  displayParam: true,
};

export default SwitchBar;
