import * as React from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity, Modal, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import IonIcons from "react-native-vector-icons/Ionicons";
import { View } from "react-native-animatable";
import { useAppDispatch } from "../hooks/storeHooks.ts";
import WordleTest1 from "../../../assets/wordle-help1.svg";
import WordleTest2 from "../../../assets/wordle-help2.svg";
import WordleTest3 from "../../../assets/wordle-help3.svg";
import * as Platform from "../../../util/orientation";
import { setHelpModal } from "../store/slices/gameStateSlice";

const Help = () => {
  const dispatch = useAppDispatch();
  const [fontsLoaded] = useFonts({
    Muli: require("../../../assets/fonts/Muli.ttf"),
    Mochy: require("../../../assets/fonts/Mochy.ttf"),
    Arial: require("../../../assets/fonts/Arial.ttf"),
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
    title: {
      justifyContent: "center",
      fontFamily: "Mochy",
      fontSize: dime * 0.06,
      color: "#fff",
      textAlign: "center",
    },
    bold: {
      fontFamily: "Mochy",
      fontSize: dime * 0.05,
      fontWeight: "bold",
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
              dispatch(setHelpModal(false));
            }}
          />
          <ScrollView style={styles.scrollview} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.header}>
              <Text style={styles.title}>
                How to Play?
                <Text style={styles.emoji}> 🎮</Text>
              </Text>
              {"\n\n"}
              Welcome to Shabadle, where you&apos;ll need to guess the word to know the meaning!
              {Platform.OS === "ios"
                ? ""
                : "It's just like the famous game Wordle but in Punjabi Style."}
              {"\n\n"}
              The color of the tiles will change to show how close your guess was to the word.
              {"\n"}
            </Text>
            <WordleTest1 width={screen.width * 0.8} height={100} style={styles.img} />
            <Text style={styles.header}>
              {"\n"}
              For instance, the first letter of this word has
              <Text style={styles.bold}> ਾ</Text>
              maatra and the last letter has a<Text style={styles.bold}> ੀ</Text>.{"\n"}
            </Text>
            <WordleTest2 width={screen.width * 0.8} height={100} style={styles.img} />
            <Text style={styles.header}>
              {"\n"}
              <Text style={styles.bold}>ਰ </Text>
              is in the word but it&apos;s in the wrong.
              {"\n\n"}
              <WordleTest3 width={screen.width * 0.8} height={100} style={styles.img} />
              {"\n"}
              <Text style={styles.bold}>ਰ </Text>
              is in the word and in the correct spot. Letter
              <Text style={styles.bold}> ਹ </Text>
              is not in the word at all.
              {"\n\n"}
              Ready to challenge yourself?
              <Text style={styles.emoji}>🧠</Text>
              {"\n"}
              Lets get started and see how many Punjabi words you can guess!
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
                dispatch(setHelpModal(false));
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
