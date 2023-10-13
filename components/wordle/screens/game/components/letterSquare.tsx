import * as React from 'react';

import { StyleSheet, Text, Vibration, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
  useDerivedValue,
  // eslint-disable-next-line
} from 'react-native-reanimated';
import { useFonts } from 'expo-font';

import { useAppSelector } from '../../../hooks/storeHooks';
import { guess } from '../../../types';
import { adjustLetterDisplay } from '../../../utils/adjustLetterDisplay';
import { colors, SIZE } from '../../../utils/constants';
import interpolateColorBugFix from '../../../utils/interpolateColorFix';
import * as PlatformCheck from '../../../../../util/orientation';

interface LetterSquareProps {
  guess: guess;
  letter: string;
  idx: number;
}

const LetterSquare = ({ guess, letter, idx }: LetterSquareProps) => {
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
  const { currentGuessIndex, wrongGuessShake, gameLanguage } = useAppSelector(
    (state) => state.gameState
  );
  const scale = useSharedValue(1);
  const rotateDegree = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return guess.isComplete
      ? withDelay(250 * idx, withTiming(1))
      : withDelay(250 * idx, withTiming(0));
  }, [guess]);
  const shakeX = useSharedValue(0);
  const matchStatus = guess.matches[idx];
  const [fontsLoaded] = useFonts({
    Muli: require('../../../../../assets/fonts/Muli.ttf'),
    GurbaniHeavy: require('../../../../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../../../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../../../../assets/fonts/Mochy.ttf'),
    Prabhki: require('../../../../../assets/fonts/Prabhki.ttf'),
    Nasa: require('../../../../../assets/fonts/Nasalization.otf'),
  });

  const matchColor = () => {
    'worklet';

    switch (matchStatus) {
      case 'correct':
        return colors.correct;
      case 'present':
        return colors.present;
      case 'absent':
        return colors.absent;
      case '':
        return colors.white;
      default:
        return colors.white;
    }
  }

  const bgStyle = useAnimatedStyle(() => {
    const colorByMatch = matchColor();
    const backgroundColor = interpolateColorBugFix(
      progress.value,
      [0, 1],
      [colors.white, colorByMatch]
    );

    return { backgroundColor };
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotateY: `${rotateDegree.value}deg` },
        { translateX: shakeX.value },
      ],
    };
  });

  React.useEffect(() => {
    if (letter !== '' && matchStatus === '') {
      scale.value = withTiming(1.2, {
        duration: 50,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      Vibration.vibrate(1);
      scale.value = withDelay(50, withTiming(1));
    }
    if (matchStatus !== '') {
      rotateDegree.value = withDelay(
        250 * idx,
        withTiming(90, {
          duration: 250,
        })
      );
      rotateDegree.value = withDelay(
        250 * (idx + 1),
        withTiming(0, {
          duration: 250,
        })
      );
    }
  }, [letter, matchStatus]);

  React.useEffect(() => {
    if (wrongGuessShake && currentGuessIndex === guess.id) {
      for (let i = 1; i < 6; i++) {
        shakeX.value = withDelay(
          10 * i,
          withTiming(-5, {
            duration: 15,
            easing: Easing.linear,
          })
        );
        shakeX.value = withDelay(
          20 * i,
          withTiming(6, {
            duration: 30,
            easing: Easing.linear,
          })
        );
        shakeX.value = withDelay(
          30 * i,
          withTiming(-8, {
            duration: 45,
            easing: Easing.linear,
          })
        );
        shakeX.value = withDelay(
          40 * i,
          withTiming(0, {
            duration: 60,
            easing: Easing.linear,
          })
        );
      }
    }
  }, [wrongGuessShake]);

  const styles = StyleSheet.create({
    square: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: (PlatformCheck.isTablet() && PlatformCheck.isLandscape()) ? dime * 0.1 : dime / 6.5,
      height: (PlatformCheck.isTablet() && PlatformCheck.isLandscape()) ? dime * 0.1 : dime / 6.5,
      borderRadius: 10,
      borderColor: colors.black,
      borderWidth: 1,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    },
    letter: {
      fontSize: (PlatformCheck.isTablet() && PlatformCheck.isLandscape()) ? dime * 0.06 : dime / 12,
      fontFamily: 'GurbaniHeavy',
      textTransform: 'uppercase',
    },
  });

  return (
    <Animated.View
      key={idx}
      style={[
        {
          ...styles.square,
          backgroundColor: matchColor(),
          borderWidth: guess.isComplete ? 0 : 1,
        },
        animatedStyles,
        bgStyle,
      ]}
    >
      <Text
        style={{
          ...styles.letter,
          color: guess.isComplete ? colors.white : colors.black,
        }}
      >
        {adjustLetterDisplay(letter, gameLanguage)}
      </Text>
    </Animated.View>
  );
};

export default LetterSquare;
