const path = require('path');
const sass = require('sass');
const fiber = require('fibers');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const src = path.join(__dirname, 'src');
const docs = path.join(__dirname, 'docs');

module.exports = {
  mode: 'production',
  entry: path.resolve(src, 'js/index'),
  output: {
    filename: 'app.min.js',
    path: docs,
    publicPath: '/gensou-cinema/'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              fiber,
              implementation: sass
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        context: path.join(__dirname, 'assets'),
        from: '**/*',
        to: docs
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(src, '/html/index.html')
    }),
    new HtmlWebpackPlugin({
      template: path.join(src, '/html/ayayayalive2d/index.html'),
      filename: 'ayayayalive2d/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'app.min.css'
    })
  ]
};
