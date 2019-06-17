// used only for expo

module.exports = function(api) {
  api.cache(true);
  return {
    plugins: ['@babel/plugin-proposal-class-properties', 'optional-require'],

    presets: ['babel-preset-expo','@babel/preset-env', '@babel/preset-react', '@babel/preset-flow']
  };
};
