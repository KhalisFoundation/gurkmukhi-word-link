/* eslint-disable */
import * as React from 'react';
import {
  StyleSheet, Modal, Text, TouchableOpacity, Animated, ImageBackground, View
} from 'react-native';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { closeNextLevelModal, reset } from '../../../redux/actions';

const RetryModal = () => {
  const state = useSelector((theState) => theState);
  const [fontsLoaded] = useFonts({
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
  });

  const styles = StyleSheet.create({
    container: {
      width: 300,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      padding: 10,
    },
    wordBox: {
      backgroundColor: '#FF7E00',
      borderRadius: 14,
      margin: 10,
      padding: 10,
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    wordDoneText: {
      fontSize: 30,
      textAlign: 'center',
      fontFamily: 'Bookish',
      color: 'white',
    },
    meaningText: {
      fontFamily: 'Muli',
      fontSize: 16,
      textAlign: 'center',
      color: state.darkMode ? '#ff6e00' : 'white',
      marginBottom: 10,
    },
    continue: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    continueText: {
      textAlign: 'center',
      fontSize: 15,
      margin: 'auto',
      fontFamily: 'Muli',
      color: 'white',
    },
    text: {
      textAlign: 'center',
      fontSize: 35,
      color: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
      paddingTop: 25,
      fontFamily: 'Bookish',
    }
  });
  const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const nowWow = getRandomNum(1, 14);
  const wows = {
    1: require('../../assets/Group-1.png'),
    2: require('../../assets/Group-2.png'),
    3: require('../../assets/Group-3.png'),
    4: require('../../assets/Group-4.png'),
    5: require('../../assets/Group-5.png'),
    6: require('../../assets/Group-6.png'),
    7: require('../../assets/Group-7.png'),
    8: require('../../assets/Group-8.png'),
    9: require('../../assets/Group-9.png'),
    10: require('../../assets/Group-10.png'),
    11: require('../../assets/Group-11.png'),
    12: require('../../assets/Group-12.png'),
    13: require('../../assets/Group-13.png'),
    14: require('../../assets/Group-14.png'),
  };
  const doneYet = Math.floor((10 - state.levelProgress[0].wordsNeeded) / 2);
  const stage = {
    0: require('../../assets/stage1.png'),
    1: require('../../assets/stage2.png'),
    2: require('../../assets/stage3.png'),
    3: require('../../assets/stage4.png'),
    4: require('../../assets/stage5.png')
  };
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Modal
      visible={state.nextLevelModal[0]}
      animationType="fade"
      transparent
    >
      <Animatable.View
        animation="slideInDown"
        iterationCount={1}
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
        }}
      >

        <View style={{
          width: '100%', alignItems: 'center', justifyContent: 'flex-start', borderRadius: 30, backgroundColor: '#274C7C'
        }}
        >
          <Animatable.View
            animation="fadeIn"
            iterationCount={1}
            style={{
              flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20
            }}
          >
            <Text style={styles.text}>
              ਵਧਾਈਆਂ ਜੀ!
            </Text>
          </Animatable.View>
          <Animatable.Image
            animation="tada"
            iterationCount={2}
            source={require('../../assets/Win.png')}
            style={{
              margin: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, height: 250, resizeMode: 'contain',
            }}
          />
          <Text style={[styles.text, { fontFamily: 'Muli', fontWeight: 'normal', fontSize: 20 }]}>
            More levels coming soon!
          </Text>
          <Animatable.View
            animation="slideInDown"
            iterationCount={1}
          >
            <TouchableOpacity
              style={styles.continue}
              onPress={() => { }}
            >
              <AnimatedLinearGradient
                colors={['#f0cb35', '#ed8f03']}
                start={{ x: 0.9, y: 1.5 }}
                style={styles.wordBox}
              >
                <Text style={styles.continueText}>Start Over &rarr;</Text>
              </AnimatedLinearGradient>
            </TouchableOpacity>
          </Animatable.View>

        </View>
      </Animatable.View>
    </Modal>
  );
}

export default RetryModal;
