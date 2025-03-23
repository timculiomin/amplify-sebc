const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  resolve: {
    fallback: {
      global: require.resolve('global')
    }
  },
  plugins: [new NodePolyfillPlugin()],
};
