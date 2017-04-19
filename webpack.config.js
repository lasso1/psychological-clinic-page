const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProd = process.argv.indexOf('-p') !== -1; // true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
  });

const cssConfig = isProd ? cssProd : cssDev;


module.exports = {
  entry: {
    app: './src/app.js',
    landing: './src/js/landing.js',
    specialists: './src/js/specialists.js',
    specialist: './src/js/specialist.js'
  },
  output: {
    // outputPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  }, 
  module: {
    rules: [
      {
        test: /\.scss$/, 
        use: cssConfig
      }, 
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          // 'file-loader?name=[name].[ext]&outputPath=images/',
          {
            loader: 'image-webpack-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: 
              {
                inlineRequires: '\/images\/'
              }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    stats: 'errors-only',
    // open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project demo',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      chunks: ['app', 'landing'],
      template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      title: 'Specialiści',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      chunks: ['app', 'specialists'],
      filename: 'specialists.html',
      template: './src/specialists.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Specjalista',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      chunks: ['app', 'specialist'],
      filename: 'specialist.html',
      template: './src/specialist.html',
    }),
    new ExtractTextPlugin({
      filename: './[name].css',
      disable: !isProd
    }),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ]
}