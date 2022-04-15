const path = require('path');

module.exports = {
  entry: './src/index.js',
  target: 'web',
  output: {
    path: __dirname + '/public/build',
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  devtool : 'eval',
  resolve: {
    extensions: ['.js', '.json'],
  },
  devServer: {
    static: './',
    historyApiFallback: true,
    compress: true,
    port: 3000,
  },
};