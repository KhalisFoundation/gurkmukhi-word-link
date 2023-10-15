module.exports = (api) => {
  api.cache(false);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["module:react-native-dotenv", "react-native-reanimated/plugin"],
  };
};
