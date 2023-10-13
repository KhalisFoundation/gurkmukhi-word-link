import * as React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as Anvaad from 'anvaad-js';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppSelector } from '../../../hooks/storeHooks';
import { adjustTextDisplay } from '../../../utils/adjustLetterDisplay';
import { colors, SIZE } from '../../../utils/constants';
import Keyboard from './keyboard';
import LetterSquare from './letterSquare';
import * as Platform from '../../../../../util/orientation';

interface GameBoardProps {
  solution: any;
  handleGuess: (keyPressed: string) => void;
  resetGame: () => void;
}

const GameBoard = ({ solution, handleGuess, resetGame }: GameBoardProps) => {
  const {
    guesses, gameEnded, wrongGuessShake, gameLanguage
  } = useAppSelector(
    (state) => state.gameState
  );
  const scrollView = React.useRef<ScrollView>();
  const [fontsLoaded] = useFonts({
    Muli: require('../../../../../assets/fonts/Muli.ttf'),
  });
  const [localState, setLocalState] = React.useState({
    orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
    devicetype: Platform.isTablet() ? 'tablet' : 'phone'
  });

  // Event Listener for orientation changes
  const [screen, setScreen] = React.useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  });

  let dimeMin = Math.min(screen.width, screen.height);
  let dimeMax = Math.max(screen.width, screen.height);
  Dimensions.addEventListener('change', () => {
    dimeMin = Math.min(screen.width, screen.height);
    setScreen({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    });
    setLocalState({
      orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
      devicetype: Platform.isTablet() ? 'tablet' : 'phone'
    });
  });

  const styles = StyleSheet.create({
    board: {
      width: SIZE,
      margin: 0,
      marginBottom: Platform.isTablet() && Platform.isPortrait() ? dimeMin * 0.1 : 10,
      backgroundColor: colors.bg,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: Platform.isTablet() ? 'space-evenly' : 'space-between'
    },
    wordsScroller: {
      width: dimeMin,
      height: Platform.isTablet() && Platform.isPortrait() ? dimeMin * 0.5 : dimeMin * 0.75,
      flexDirection: 'column'
    },
    squareBlock: {
      width: dimeMin * 0.8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginBottom: 10,
    },
    blocksContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    gameResult: {
      width: dimeMin,
      height: dimeMin * 0.2,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    resetButton: {
      alignSelf: 'center',
      alignItems: 'center',
      width: dimeMin * 0.3,
      borderRadius: 15,
      elevation: 5,
      backgroundColor: colors.grey,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    resetButtonText: {
      fontFamily: 'Muli',
      fontSize: dimeMin * 0.04,
      alignSelf: 'center',
      padding: 5,
      margin: 5,
      textShadowRadius: 4,
      color: colors.white,
    },
    solution: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: dimeMin * 0.2
    },
    solutionText: {
      fontSize: dimeMin * 0.05,
      fontFamily: 'Muli',
      color: colors.white,
    },
    wrongGuessText: {
      fontFamily: 'Muli',
      fontSize: dimeMin * 0.05,
      color: colors.white,
    },
    // punjabiText: {
    //   fontFamily: 'Bookish',
    //   fontSize: 16,
    //   color: colors.white,
    // }
  });

  return (
    <SafeAreaView style={styles.board}>
      <ScrollView
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd({ animated: true })}
        scrollEventThrottle={16}
        style={styles.wordsScroller}
        contentContainerStyle={styles.blocksContainer}
      >
        {guesses.map((guess, idx) => (
          <View key={idx} style={styles.squareBlock}>
            {guess.letters.map((letter, idx) => {
              return (
                <LetterSquare
                  key={idx}
                  idx={idx}
                  letter={letter}
                  guess={guess}
                />
              );
            })}
          </View>
        ))}
      </ScrollView>
      <View style={styles.gameResult}>
        {gameEnded && (
          <View style={styles.solution}>
            <Text style={styles.solutionText}>
              Solution:
              {' '}
              {adjustTextDisplay(solution.punjabiText, gameLanguage)}
              {` (${solution.meaning})`}
            </Text>
            {/* <Text style={styles.punjabiText}>
              {Anvaad.unicode(solution, true)}
            </Text> */}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => resetGame()}
            >
              <Text style={styles.resetButtonText}>New Game</Text>
            </TouchableOpacity>
          </View>
        )}
        {wrongGuessShake && (
          <Animated.Text
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.wrongGuessText}
          >
            Invalid Input
            {/* Not in word list */}
          </Animated.Text>
        )}
      </View>
      <Keyboard handleGuess={handleGuess} />
    </SafeAreaView>
  );
};

export default GameBoard;
