const path = require('path');
const sass = require('sass');
const fiber = require('fibers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: path.resolve(src, 'js/index'),
  output: {
    filename: 'app.js',
    path: dist,
    publicPath: '/'
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
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
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
  devServer: {
    contentBase: dist,
    disableHostCheck: true,
    inline: true,
    hot: true,
    port: 8000
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new CopyWebpackPlugin([
      {
        context: path.join(__dirname, 'assets'),
        from: '**/*',
        to: `${dist}/gensou-cinema`
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
      filename: 'app.css'
    })
  ]
};
