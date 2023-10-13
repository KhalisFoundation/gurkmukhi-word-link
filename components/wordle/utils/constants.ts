import { Dimensions } from 'react-native';
import * as Anvaad from 'anvaad-js';

import { guess } from '../types';

const ascMaatras: string[] = [
  'w', 'i', 'I', 'u', 'U', 'y', 'Y', 'o', 'O', 'N', 'M', '`', '~'
];

export const maatras: string[] = ascMaatras.map((val) => { return Anvaad.unicode(val); });

export const { width: SIZE, height: HEIGHT } = Dimensions.get('window');

export const colors = {
  correct: '#6aaa64',
  present: '#c9b458',
  absent: '#434B59',
  keyDefault: '#035',
  white: '#f5f5f7',
  bg: '#274C7C',
  grey: '#404040',
  black: '#1d1d1f',
};

export const sampleGuess: guess[] = [
  {
    id: 0,
    letters: [],
    matches: [],
    isComplete: false,
    isCorrect: false,
  }
];

export const initialGuesses: guess[] = [];
