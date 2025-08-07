module.exports = function (api) {
  api.cache(true);
  // Use Expo's default preset which includes TypeScript support.
  return {
    presets: ['babel-preset-expo'],
    plugins: [],
  };
};
