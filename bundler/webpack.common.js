
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'react-hot-loader/webpack'
        ],
        include: path.join(__dirname, '..', 'src'),
        exclude: path.join(__dirname, '..', 'node_modules'),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WriteFilePlugin(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '..') + '/src/template/index.html'
    }),
    new CleanWebpackPlugin(
        ['build'],
        {
          root: path.join(__dirname, '..'),
          verbose: true 
        }
    )
  ],
  output: {
    path: path.join(__dirname,  '..', "build"),
    publicPath: "/",
    filename: "bundle.js"
  }
};

module.exports = config