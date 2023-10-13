import * as React from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity, Modal, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import IonIcons from "react-native-vector-icons/Ionicons";
import { View } from "react-native-animatable";
import WordWheel from "../../assets/wordWheel.svg";
import Tools from "../../assets/toolTips.svg";
import { closeHelpModal } from "../../redux/actions";

const Help = () => {
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    Muli: require("../../assets/fonts/Muli.ttf"),
    Arial: require("../../assets/fonts/Arial.ttf"),
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

  const styles = StyleSheet.create({
    modal: { flex: 1 },
    externalBg: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    container: {
      flex: 1,
      alignSelf: "center",
      borderRadius: 15,
      padding: 15,
      marginVertical: 40,
      width: "90%",
      backgroundColor: "#274C7C",
    },
    img: {
      alignSelf: "center",
    },
    header: {
      justifyContent: "center",
      fontFamily: "Muli",
      fontSize: dime * 0.04,
      color: "#fff",
      textAlign: "justify",
    },
    continue: {
      justifyContent: "center",
      textAlign: "center",
      alignSelf: "center",
      margin: 20,
      marginBottom: 40,
      backgroundColor: "#ff8c00",
      borderRadius: 10,
      height: dime * 0.075,
      width: dime * 0.4,
      elevation: 5,
    },
    continueTxt: {
      textAlign: "center",
      fontFamily: "Muli",
      fontSize: dime * 0.045,
      color: "#000",
    },
    emoji: {
      fontFamily: "Arial",
    },
    scrollview: {
      flex: 1,
      flexDirection: "column",
      alignSelf: "center",
      borderRadius: 15,
      padding: 15,
      marginTop: 10,
      width: "100%",
      overflow: "hidden",
      backgroundColor: "#274C7C",
    },
    scrollContent: { flexDirection: "column", justifyContent: "space-between" },
    left: { marginLeft: 10 },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Modal transparent style={styles.modal}>
      <SafeAreaView style={styles.externalBg}>
        <View style={styles.container}>
          <IonIcons
            name="close"
            size={dime * 0.07}
            color="#fff"
            style={styles.left}
            onPress={() => {
              dispatch(closeHelpModal());
            }}
          />
          <ScrollView style={styles.scrollview} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.header}>
              Are you ready to test your Punjabi vocabulary skills?
              <Text style={styles.emoji}> 🧐</Text>
              {"\n\n"}
              Welcome to Akhar Jor, where you&apos;ll link up letters in Gurmukhi to spell words
              related to Sikhism and Gurbani!
              {"\n"}
            </Text>
            <WordWheel height={dime * 0.75} style={styles.img} />
            <Text style={styles.header}>
              {"\n"}
              Level up your game
              <Text style={styles.emoji}>💪</Text>: With each level, the words get harder, but
              don&apos;t worry!
              {"\n\n"}
              You&apos;ll be given a clue
              <Text style={styles.emoji}>💡</Text>
              to help you solve the word. Keep trying until you get it right - there&apos;s no
              penalty for trying as many times as you need.
              {"\n"}
            </Text>
            <Tools height={dime * 0.7} style={styles.img} />
            <Text style={styles.header}>
              {"\n"}
              Need a hand?
              {"\n"}
              If you&apos;re feeling stuck
              <Text style={styles.emoji}>🤔</Text>, click on the bulb icon for a hint. One letter
              will be filled in for you, but it&apos;ll cost you credits.
              {"\n\n"}
              Keep an eye
              <Text style={styles.emoji}>👀 </Text>
              on your credit counter in the top-right corner, and click on the (+) icon to earn some
              extra credits by spelling out sentences.
              {"\n\n"}
              Ready to challenge yourself?
              <Text style={styles.emoji}>🧠</Text>
              {"\n"}
              Lets get started and see how many Gurbani words you can spell!
            </Text>
            {/* {'\n\n'}
            The game where you link up letters in Gurmukhi to spell a word associated with a
            Sikh-related,Gurbani, or Punjabi context. Here are some of the things you need to know.
            {'\n\n'}
            ◎ The game is split into many levels - in each level you will need to spell
            at least ten words using the Gurmukhi wheel of letters. The words get harder
            at each level but you are provided with a clue to help you solve the word.
            {'\n\n'}
            {'\n'}
            Simply click the letters in the wheel to spell the word. If you get it wrong,
            you must try again. You can try as many times as you want without getting penalized.
            And if you get it right, you will be awarded points and the word will be added
            to your list of words.
            {'\n\n'}
            ◎ If you get stuck and need help, click on the bulb icon in the bottom left for a clue.
            The helper will fill in one letter for you - but beware, this will cost you credits
            you have accumulated that you can see by looking at the counter in the top-right corner.
            {'\n'}
            {'\n'}
            The counter tells you how many credits you have left but clicking on the + icon
            next to it will give you the opportunity to earn some extra ones.
            You will just need to spell out a sentence to be gifted credits.
          </Text> */}

            <TouchableOpacity
              style={styles.continue}
              onPress={() => {
                dispatch(closeHelpModal());
              }}
            >
              <Text style={styles.continueTxt}>PLAY</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Help;
