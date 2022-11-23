import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import GLOBAL from '../../util/globals';
import KhalisDark from '../../assets/khalis_logo_dark.svg';
import Logo from '../../assets/sikh_games.svg';
import dimensions from '../../util/dimensions';

function About({ navigation }) {
  const [fontsLoaded] = useFonts({
    Muli: require('../../assets/fonts/Muli.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Prabhki: require('../../assets/fonts/Prabhki.ttf'),
    Nasa: require('../../assets/fonts/Nasalization.otf'),
  });
  const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
      color: GLOBAL.COLOR.TOOLBAR_TINT,
      fontSize: (dimensions.screenWidth < 370 ? 16 : 20),
      fontFamily: 'Muli',
      margin: 0,
    },
    scrollview: {
      flex: 1,
      flexDirection: 'column',
      padding: 15,
      height: '100%'
    },
    scrollContent: { flexDirection: 'column', justifyContent: 'space-between' },
    singleLine: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    small: {
      fontSize: 11,
      fontFamily: 'Muli',
      color: black
    },
    innerView: {
      width: '100%',
      height: dimensions.size['24'],
      backgroundColor: GLOBAL.COLOR.TOOLBAR_COLOR_ALT2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5
    },
    back: {
      position: 'absolute',
      left: 10
    },
    info: {
      fontSize: 16, fontFamily: 'Muli', color: black, margin: 10, marginTop: 0, marginStart: 0
    },
    logo: { height: 175, marginTop: 20 },
    title1: { fontFamily: 'Nasa', fontSize: 25, color: black },
    title2: { fontFamily: 'GurbaniHeavy', fontSize: 30, color: black },
    aboutus: { fontSize: 16, fontFamily: 'Muli', color: black },
    link: { color: linkColor, fontWeight: 'bold' },
    ending: { fontFamily: 'Muli', alignSelf: 'flex-end', color: black }
  });
  const linkColor = '#009bff';
  const black = '#000';

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar
        backgroundColor="#003436"
        barStyle="light-content"
      />
      <View style={styles.innerView}>
        <IonIcons
          name="chevron-back"
          color={GLOBAL.COLOR.TOOLBAR_TINT}
          size={30}
          style={styles.back}
          onPress={() => { navigation.goBack(); }}
        />
        <Text style={styles.header}>About</Text>
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
        <Logo style={styles.logo} />

        {/* Explaining Akhar Jor */}
        <Text style={styles.title1}>
          {'\n'}
          Akhar Jor
        </Text>
        <Text style={styles.info}>
          This game uses a collection of commonly used Gurmukhi/Punjabi words to create a
          game that is fun and easy to play. It will help you increase your vocabulary and
          understand more words that appear in Gurbani.
          {' '}
        </Text>

        {/* Explaining 2048 */}
        <Text style={styles.title2}>
          {'\n'}
          2048
        </Text>
        <Text style={styles.info}>
          A popular game combined with Punjabi numerals to help you learn and recognize numbers.
        </Text>

        {/* Welcoming comments and suggestions */}
        <Text style={styles.aboutus}>
          <Text>{'\n'}</Text>
          <Text>
            Khalis Foundation is a non-profit, 501(c)3 organization registered in,
            and operated from, California, USA. Our focus is spreading Gurbani
            and influencing a Sikh way of life through the education and technology.
            {'\n\n'}
            We welcome your comments and corrections!
            {' '}
            For information, suggestions, or help, visit us at
            {'  '}
          </Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://khalisfoundation.org')}
          >
            KhalisFoundation.org
          </Text>
          {'\n'}
        </Text>
        <View>
          <Text style={styles.ending}>
            {'\n'}
            Bhul Chuk Maaf!
            {'\n'}
          </Text>

          <TouchableOpacity
            underlayColor={linkColor}
            onPress={() => Linking.openURL('https://khalisfoundation.org')}
          >
            <KhalisDark height={50} />
          </TouchableOpacity>

          <View style={styles.singleLine}>
            <Text
              style={styles.small}
            >
              &copy;
              {' '}
              {new Date().getFullYear()}
              {' '}
              Khalis Foundation
            </Text>
            <Text
              style={styles.small}
            >
              Chardikala
              {'\n'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default About;
