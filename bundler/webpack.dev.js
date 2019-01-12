const webpack = require("webpack");
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const config = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: [
    './src/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3001'
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    port: 3001,
    hot: true,
    open: true
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = merge(commonConfig, config)
