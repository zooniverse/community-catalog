const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  devServer: {
    allowedHosts: [
      'localhost',
      '.zooniverse.org'
    ],
    historyApiFallback: true,
    server: 'https',
  },
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.ico$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      favicon: 'src/favicon.ico',
      process: 'process/browser',
    }),
    HtmlWebpackPluginConfig
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
    fallback: {
      'url': require.resolve('url/'),  // Required by panoptes-client
    },
  },
}
