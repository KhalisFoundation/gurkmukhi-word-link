import { defaultMatraValue, matras } from "../constants";

const getMatraAkhar = (matra, query) => {
  const lastChar = query[query.length - 1];
  const matraValue = defaultMatraValue[matra];
  const notMatraRegex = new RegExp(`[^${matra}]`, "g");

  if (query.length && !matras.includes(lastChar)) {
    return matraValue.replace(notMatraRegex, lastChar);
  }
  if (matras.includes(lastChar)) {
    return matraValue;
  }
  return matraValue;
};

export default getMatraAkhar;
