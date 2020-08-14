// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  entry: './dist/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'web/js'),
    filename: 'viewer.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
};