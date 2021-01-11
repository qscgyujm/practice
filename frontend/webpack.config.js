const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

module.exports = {
  entry: './src/index.tsx', // 進入點
  output: { // 輸出位置
    path: path.join(__dirname, 'dist'),
    // publicPath: '/dist/',
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      //  .jsx use
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //   },
      // },
    ],
  },
  plugins: [htmlPlugin],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@Component': path.resolve(__dirname, './src/Component/'),
      '@Helpers': path.resolve(__dirname, './src/helpers/'),
      '@Page': path.resolve(__dirname, './src/page/'),
      '@Store': path.resolve(__dirname, './src/store/'),
      '@Style': path.resolve(__dirname, './src/styles/'),
      '@Hoc': path.resolve(__dirname, './src/hoc/'),
      '@Api': path.resolve(__dirname, './src/api/'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 網站內容從哪來，預設會使用 '/'
    // publicPath: '/assets/',    // 打包好的檔案將在這個路由下取用
    compress: false, // 使用 gzip 壓縮
    port: 8080,
    index: 'index.html',
    hot: true, // 使用 HMR
    host: '0.0.0.0', // 預設是 localhost，設定則可讓外網存取
    open: true, // 打開瀏覽器
    inline: true,
    // useLocalIp: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
};
