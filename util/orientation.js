import { Dimensions, Platform } from "react-native";

/**
 *
 * @param {ScaledSize} dim the dimensions object
 * @param {*} limit the limit on the scaled dimension
 */
// const msp = (dim, limit) => {
//   return dim.scale * dim.width >= limit || dim.scale * dim.height >= limit;
// };

/**
 * Returns true if the screen is in portrait mode
 */
export const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

/**
 * Returns true of the screen is in landscape mode
 */
export const isLandscape = () => {
  const dim = Dimensions.get("screen");
  return dim.width >= dim.height;
};

/**
 * Returns true if the device is a tablet
 */
export const isTablet = () => {
  const dim = Dimensions.get("screen");
  // return true if device is iPad
  if (Platform.OS === "ios") {
    return dim.height >= 1024 || dim.width >= 1024;
  }
  // return true if device is android and screen's longest side is at least 1900 pixels
  return dim.width >= 1900 || dim.height >= 1900;
};

/**
 * Returns true if the device is a phone
 */
export const isPhone = () => {
  return !isTablet();
};

export const OS = () => {
  return Platform.OS;
};
