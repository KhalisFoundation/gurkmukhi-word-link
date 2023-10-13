import { maatras } from './constants';

export const getGuess = (solution: string, id: number) => {
  const guess = {
    id,
    letters: Array(solution.split('').length).fill(''),
    matches: Array(solution.split('').length).fill(''),
    isComplete: false,
    isCorrect: false,
  };
  const numMaatras = solution.split('').filter((akhar) => { return maatras.includes(akhar); }).length;
  let i = 0;
  solution.split('').map((akhar, idx) => {
    if (maatras.includes(akhar)) {
      i++;
      if (guess) {
        guess.letters.pop();
        guess.matches.pop();
        guess.letters[idx - i] = akhar;
      }
      return [akhar, idx - i];
    }
    return undefined;
  }).filter((ele) => { return ele != undefined; });
  return [guess];
};
