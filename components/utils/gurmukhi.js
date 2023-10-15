const matras = ["I", "u", "U", "y", "Y", "o", "O", "M", "N", "`", "~", "Í", "R", "H"];
const gurmukhi = (text) => {
  if (matras.includes(text)) {
    return ` ${text}`;
  }
  return text;
};

export default gurmukhi;
