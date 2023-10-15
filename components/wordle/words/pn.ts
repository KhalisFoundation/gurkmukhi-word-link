import allWords from '../../../util/allWords';

// combine all lists to one in allWords.levels starting from index 1
const levelList = allWords.levels.slice(1).flat();

// remove words with multiple maatras on single letter
export const allLevels = levelList.filter((word) => {
  const parts = word.punjabiText.split('');
  // if any two maatras are next to next, return false
  for (let i = 0; i < parts.length - 1; i += 1) {
    if (parts[i].match(/0|੍/)) {
      return false;
    }
    if (parts[i].match(/ਾ|ਿ|ੀ|ੁ|ੂ|ੇ|ੈ|ੋ|ੌ|ੰ|ੱ|ਂ|ਃ|੍/) && parts[i + 1].match(/ਾ|ਿ|ੀ|ੁ|ੂ|ੇ|ੈ|ੋ|ੌ|ੰ|ੱ|ਂ|ਃ|੍/)) {
      return false;
    }
  }
  return true;
});
