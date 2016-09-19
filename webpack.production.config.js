var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry:  {
		app: __dirname + "/application.js",
		vendors: ['underscore']
	},//已多次提及的唯一入口文件
	output: {
		path: __dirname + "/dist",//打包后的文件存放的地方
		filename: "[name].js"//打包后输出文件的文件名
	},
	
	module:{
		loaders: [
		{
			test: /\.json$/,
			loader: 'json'
		},
      	{
      		test: /\.css$/, 
      		loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      	},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		},
		{
			test: /\.scss$/,
			loader: 'style!css?modules!postcss!sass'
		}]
	},
	externals: {
    	jquery: 'window.$'
	},
  resolve: {
    extensions: ['', '.js', '.json', '.scss', 'css']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin("[name].css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    //这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],
  postcss: [
    require('autoprefixer')//调用autoprefixer插件
  ]
}