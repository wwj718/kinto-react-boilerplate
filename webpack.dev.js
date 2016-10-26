var path = require("path");
var webpack = require("webpack");
//var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');   //使用这个之后页面一直加载

//这个文件中的许多配置是实现：React-hot-loader 组件级热更新
//  http://guoyongfeng.github.io/idoc/html/React%E8%AF%BE%E7%A8%8B%E4%B8%93%E9%A2%98/%E4%BD%BF%E7%94%A8Webpack%E6%90%AD%E5%BB%BA%E5%BC%80%E5%8F%91%E6%80%81%E5%B7%A5%E4%BD%9C%E6%B5%81.html

module.exports = {
  devtool: "eval", //调试工具的模式，eval是将你的css和js代码变为eval的方式合并打包
  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "./scripts/index"
  ],
  output: {
    path: path.join(__dirname, "scripts"),
    filename: "bundle.js",
    publicPath: "scripts/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //new openBrowserWebpackPlugin({ url: 'http://localhost:3000/webpack-dev-server/' })
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ["react-hot", "babel"],
      include: path.join(__dirname, "scripts"),
    }]
  }
};
