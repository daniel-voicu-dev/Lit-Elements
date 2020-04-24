const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js',
    elements: './src/elements.js',
    alert: './src/alert.js',
  },
  output: {
    module: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],        
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/i,
  //       use: ['style-loader', 'css-loader'],
  //     },
  //   ],
  // },
  devServer: {
      // contentBase: './dist',
      hot: true
  }, 
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    // new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'Development',
    // }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};