import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import PropTypes from "prop-types";
import GLOBAL from "../../util/globals";
import KhalisLogo from "../../assets/khalis_incubator.svg";
import Logo from "../../assets/akhar_logo_with_text.svg";

const About = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Muli: require("../../assets/fonts/Muli.ttf"),
    GurbaniHeavy: require("../../assets/fonts/GurbaniAkharHeavySG.ttf"),
    Bookish: require("../../assets/fonts/Bookish.ttf"),
    Mochy: require("../../assets/fonts/Mochy.ttf"),
    Prabhki: require("../../assets/fonts/Prabhki.ttf"),
    Nasa: require("../../assets/fonts/Nasalization.otf"),
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
  });

  const linkColor = "#009bff";
  const black = "#000";
  const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center" },
    header: {
      color: GLOBAL.COLOR.TOOLBAR_TINT,
      fontSize: dime * 0.05,
      fontFamily: "Muli",
      margin: 0,
    },
    scrollview: {
      flex: 1,
      flexDirection: "column",
      padding: 15,
      height: "100%",
    },
    scrollContent: { flexDirection: "column", justifyContent: "space-between" },
    singleLine: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    small: {
      fontSize: dime * 0.03,
      fontFamily: "Muli",
      color: black,
    },
    outerHeader: {
      width: screen.width,
      alignItems: "center",
      backgroundColor: GLOBAL.COLOR.TOOLBAR_COLOR_ALT2,
    },
    innerHeader: {
      width: "90%",
      height: dime * 0.175,
      backgroundColor: GLOBAL.COLOR.TOOLBAR_COLOR_ALT2,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      elevation: 5,
    },
    back: {
      position: "absolute",
      left: 10,
    },
    info: {
      fontSize: dime * 0.04,
      fontFamily: "Muli",
      color: black,
      margin: 10,
      marginTop: 0,
      marginStart: 0,
    },
    logo: {
      resizeMode: "contain",
      alignSelf: "center",
    },
    title1: { fontFamily: "Nasa", fontSize: dime * 0.06, color: black },
    title2: { fontFamily: "GurbaniHeavy", fontSize: dime * 0.07, color: black },
    aboutus: { fontSize: dime * 0.04, fontFamily: "Muli", color: black },
    link: { color: linkColor, fontWeight: "bold" },
    ending: {
      fontSize: dime * 0.03,
      fontFamily: "Muli",
      alignSelf: "flex-end",
      color: black,
    },
    logoTouchable: {
      width: "100%",
      alignItems: "center",
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#003436" barStyle="light-content" />
      <View style={styles.outerHeader}>
        <View style={styles.innerHeader}>
          <IonIcons
            name="chevron-back"
            color={GLOBAL.COLOR.TOOLBAR_TINT}
            size={dime * 0.07}
            style={styles.back}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.header}>About</Text>
        </View>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        style={styles.scrollview}
        contentContainerStyle={styles.scrollContent}
      >
        {/* <View>
          <MaskedView
            style={{ height: 50, width: '100%' }}
            maskElement={(
              <View
                style={{
                  backgroundColor: transparent,
                }}
              >
                <Text style={[styles.title, { fontFamily: 'Bookish' }]}>is~K gyms</Text>
              </View>
            )}
          >
            <LinearGradient
              colors={state.darkMode ? darkGradient : lightGradient}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <Text style={{ fontFamily: 'Nasa', fontSize:25, color: "#61CAE5"}}>(SIKH GAMES)</Text>
        </View> */}
        <Logo style={styles.logo} width={dime * 0.7} height={dime * 0.7} />

        <Text style={styles.aboutus}>
          {"\n"}
          Akhar: Punjabi Games is a treasure of fun games created by young developers at Khalis
          Incubator, to help everyone learn punjabi the fun way.
        </Text>

        {/* Explaining Akhar Jor */}
        <Text style={styles.title1}>
          {"\n"}
          Akhar Jor
        </Text>
        <Text style={styles.info}>
          This game uses a collection of commonly used Gurmukhi/Punjabi words to create a game that
          is fun and easy to play. It will help you increase your vocabulary and understand more
          words that appear in Gurbani.{" "}
        </Text>

        {/* Explaining 2048 */}
        <Text style={styles.title2}>
          {"\n"}
          2048
        </Text>
        <Text style={styles.info}>
          A popular game combined with Punjabi numerals to help you learn and recognize numbers.
        </Text>

        {/* Welcoming comments and suggestions */}
        <Text style={styles.aboutus}>
          <Text>{"\n"}</Text>
          <Text>
            Khalis Incubator is an initiative by Khalis Foundation (a 501(c)3 non-profit
            organization registered and based in California, USA) to create more opportunities for
            youth from traditionally under-represented groups with a focus on South Asian minority
            communities. We aim to foster opportunities for growth whether that be in professional
            training, technical experience, or Sikh cultural knowledge.
            {"\n\n"}
            We welcome your comments and corrections! For information, suggestions, or help, visit
            us at
            {"  "}
          </Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://khalisfoundation.org/")}
          >
            KhalisFoundation.org
          </Text>
          {"\n"}
        </Text>
        <View>
          <Text style={styles.ending}>
            {"\n"}
            Bhul Chuk Maaf!
            {"\n"}
          </Text>

          <TouchableOpacity
            style={styles.logoTouchable}
            underlayColor={linkColor}
            onPress={() => Linking.openURL("https://khalis.dev")}
          >
            <KhalisLogo width={dime * 0.5} height={dime * 0.2} />
          </TouchableOpacity>

          <View style={styles.singleLine}>
            <Text style={styles.small}>&copy; {new Date().getFullYear()} Khalis Incubator</Text>
            <Text style={styles.small}>
              Chardikala
              {"\n"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

About.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default About;
