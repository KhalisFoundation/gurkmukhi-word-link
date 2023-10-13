import React from 'react';

import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions
} from 'react-native';
import { useFonts } from 'expo-font';

import { useAppSelector } from '../../../hooks/storeHooks';
import { adjustLetterDisplay } from '../../../utils/adjustLetterDisplay';
import { colors, SIZE } from '../../../utils/constants';
import * as PlatformCheck from '../../../../../util/orientation';

export const Letters = [
  ['ੳ', 'ਅ', 'ੲ', 'ਸ', 'ਹ', 'ਕ', 'ਖ', 'ਗ', 'ਘ', 'ਙ'],
  ['ਚ', 'ਛ', 'ਜ', 'ਝ', 'ਞ', 'ਟ', 'ਠ', 'ਡ', 'ਢ', 'ਣ'],
  ['ਤ', 'ਥ', 'ਦ', 'ਧ', 'ਨ', 'ਪ', 'ਫ', 'ਬ', 'ਭ', 'ਮ'],
  ['ਯ', 'ਰ', 'ਲ', 'ਵ', 'ੜ', 'ਸ਼', 'ਖ਼', 'ਗ਼', 'ਜ਼', 'ਫ਼'],
  ['ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', 'ਏ', 'ਐ', 'ਓ', 'ਔ'],
  ['Enter', '<']
];
const keysEN: string[][] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<'],
];

const keysPN: string[][] = [
  ['ੳ', 'ਅ', 'ੲ', 'ਸ', 'ਹ', 'ਕ', 'ਖ', 'ਗ', 'ਘ', 'ਙ'],
  ['ਚ', 'ਛ', 'ਜ', 'ਝ', 'ਞ', 'ਟ', 'ਠ', 'ਡ', 'ਢ', 'ਣ'],
  ['ਤ', 'ਥ', 'ਦ', 'ਧ', 'ਨ', 'ਪ', 'ਫ', 'ਬ', 'ਭ', 'ਮ'],
  ['ਯ', 'ਰ', 'ਲ', 'ਵ', 'ੜ', 'ਸ਼', 'ਖ਼', 'ਗ਼', 'ਜ਼', 'ਫ਼'],
  ['ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', 'ਏ', 'ਐ', 'ਓ', 'ਔ'],
  ['Enter', 'Reset', '<']
];

interface KeyboardProps {
  handleGuess: (keyPressed: string) => void;
}

const Keyboard = ({ handleGuess }: KeyboardProps) => {
  const { usedKeys, gameLanguage } = useAppSelector((state) => state.gameState);
  const keyboard = gameLanguage === 'en' ? keysEN : keysPN;

  // Event Listener for orientation changes
  const [screen, setScreen] = React.useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  });

  let dime = Math.min(screen.width, screen.height);
  Dimensions.addEventListener('change', () => {
    dime = Math.min(screen.width, screen.height);
    setScreen({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    });
  });

  const [fontsLoaded] = useFonts({
    Muli: require('../../../../../assets/fonts/Muli.ttf'),
    GurbaniHeavy: require('../../../../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../../../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../../../../assets/fonts/Mochy.ttf'),
    Prabhki: require('../../../../../assets/fonts/Prabhki.ttf'),
    Nasa: require('../../../../../assets/fonts/Nasalization.otf'),
  });

  const styles = StyleSheet.create({
    keyboardContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: PlatformCheck.isTablet() ? (PlatformCheck.isLandscape() ? dime * 0.15 : dime * 0.1) : 0,
    },
    keyboardRow: {
      width: SIZE,
      marginBottom: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    keyContainer: {
      width: (PlatformCheck.isTablet() && PlatformCheck.isLandscape()) ? dime * 0.06 : dime * 0.09,
      height: (PlatformCheck.isTablet() && PlatformCheck.isLandscape()) ? dime * 0.06 : dime * 0.09,
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      color: colors.white,
      fontFamily: 'Bookish',
      borderRadius: 100,
      backgroundColor: colors.keyDefault,
      elevation: 5,
      margin: 2,
    },
    keyboardKey: {
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      textTransform: 'uppercase',
      marginVertical: 0,
      padding: 2,
      color: colors.white,
    },
  });

  const handleKeyboardKeyColor = (key: string) => {
    const keyData = usedKeys[key];
    if (keyData) {
      if (keyData === 'correct') {
        return colors.correct;
      } if (keyData === 'present') {
        return colors.present;
      } if (keyData === 'absent') {
        return colors.absent;
      } return colors.keyDefault;
    } return colors.keyDefault;
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.keyboardContainer}>
      {keyboard.map((keysRow, idx) => (
        <View
          key={idx}
          style={{
            ...styles.keyboardRow,
            width: idx === 1 ? SIZE * 0.95 : SIZE,
          }}
        >
          {keysRow.map((keyboardKey) => {
            const keyRowCount = keysRow.length + 2;
            return (
              <TouchableOpacity
                key={keyboardKey}
                style={{
                  ...styles.keyContainer,
                  backgroundColor: handleKeyboardKeyColor(keyboardKey),
                  flex: 1,
                }}
                onPress={() => handleGuess(keyboardKey)}
              >
                {keyboardKey === '<' ? (
                  <IonIcons
                    name="backspace-outline"
                    style={{ ...styles.keyboardKey, fontSize: dime * 0.05 }}
                  />
                ) : (
                  <Text
                    style={{
                      ...styles.keyboardKey,
                      fontFamily: keyboardKey === 'Enter' || keyboardKey === 'Reset' ? 'Muli' : 'Bookish',
                      fontWeight: keyboardKey === 'Enter' || keyboardKey === 'Reset' ? 'bold' : 'normal',
                      fontSize: (keyboardKey === 'Enter' || keyboardKey === 'Reset' || (PlatformCheck.isTablet() && PlatformCheck.isLandscape())) ? dime * 0.035 : dime * 0.05,
                    }}
                  >
                    {adjustLetterDisplay(keyboardKey, gameLanguage)}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default Keyboard;
