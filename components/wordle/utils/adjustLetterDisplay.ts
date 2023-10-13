import { maatras } from './constants';

export const adjustLetterDisplay = (
  letter: string,
  gameLanguage: string
): string => {
  if (letter in maatras) {
    const akhar = maatras[maatras.indexOf(letter)];
    if (akhar) {
      return gameLanguage === 'pn' ? akhar : letter;
    }
  }
  if (letter === 'Reset') { return 'New Game'; }
  return letter;
};

export const adjustTextDisplay = (
  text: string,
  gameLanguage: string
): string => {
  return text
    .split('')
    .map((letter) => adjustLetterDisplay(letter, gameLanguage))
    .join('');
};
