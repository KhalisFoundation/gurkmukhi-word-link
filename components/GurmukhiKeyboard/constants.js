export const withoutMatra = [
  ['a', 'A', 'e', 's', 'h', 'k', 'K', 'g', 'G', '|'],
  ['c', 'C', 'j', 'J', '\\', 't', 'T', 'f', 'F', 'x'],
  ['q', 'Q', 'd', 'D', 'n', 'p', 'P', 'b', 'B', 'm'],
  ['X', 'r', 'l', 'v', 'V', 'S', 'space'],
];

export const withMatra = [
  ['w', 'i', 'I', 'u', 'U', 'y', 'Y', 'o', 'O', 'M'],
  ['a', 'A', 'e', 's', 'h', 'k', 'K', 'g', 'G', 'N'],
  ['c', 'C', 'j', 'J', 't', 'T', 'f', 'F', 'x', 'R'],
  ['q', 'Q', 'd', 'D', 'n', 'p', 'P', 'b', 'B', 'm'],
  ['X', 'r', 'l', 'v', 'V', 'S', 'SRI', 'gRM', 'space'],
];

export const defaultMatraValue = {
  w: 'Aw',
  i: 'ie',
  I: 'eI',
  u: 'au',
  U: 'aU',
  y: 'ey',
  Y: 'AY',
  o: 'Ao',
  O: 'AO',
  M: ' M',
  '`': ' `',
  N: ' N',
  R: ' R',
  ' ': ' ',
};

export const matras = Object.keys(defaultMatraValue);
matras.push('a');
