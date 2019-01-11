const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '..', 'src/template') + '/server.js',
        to: path.join(__dirname, '..') + '/build/index.js',
        toType: 'file'
      }
    ])
  ]
};

module.exports = merge(commonConfig, config)
