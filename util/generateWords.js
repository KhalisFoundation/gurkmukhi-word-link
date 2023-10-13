const getWords = (words) => {
  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
  const firstWord = getRandomWord();
  let secondWord = getRandomWord();
  while (firstWord.punjabiText === secondWord.punjabiText) {
    secondWord = getRandomWord();
  }

  const characters = []; // english characters/unicode
  for (let i = 0; i < firstWord.engText.length; i += 1) {
    const theChar = firstWord.engText.charAt(i);
    if (!characters.includes(theChar)) {
      characters.push(theChar);
    }
  }
  for (let i = 0; i < secondWord.engText.length; i += 1) {
    const theChar = secondWord.engText.charAt(i);
    if (!characters.includes(theChar)) {
      characters.push(theChar);
    }
  }
  return [characters, firstWord, secondWord];
}

export default getWords;
