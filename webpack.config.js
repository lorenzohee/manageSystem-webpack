var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项,生成调试文件
	entry:  {
		main: ['webpack/hot/dev-server', './src/js'],//热加载模块
		file: __dirname + "/application.js",
		vendor: ['underscore', 'bootstrap', 'dataTables']//插入第三方插件
	},//唯一入口文件
	output: {
		path: __dirname + "/public",//打包后的文件存放的地方
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
      test : /\.(png|jpg|gif)$/,
      loader : 'url',
      query : {
        limit : 10000,
        // CSS图片目录
        name : '[path][name]_[hash].[ext]'
      }
    },
		{
			test: /\.scss$/,
			loader: 'style!css?modules!postcss!sass'
		},
    { 
      test: /\.hbs$/,
      loader: "handlebars"
    }, {// bootstrap font-awesome
          test : /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader : 'url',
          query : {
            limit : 10000,
            mimetype : 'application/font-woff',
            // 字体文件放置目录
            name : 'fonts/[name].[ext]'
          }
        }, {// bootstrap
          test : /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader : 'url',
          query : {
            limit : 10000,
            mimetype : 'application/octet-stream',
            // 字体文件放置目录
            name : 'fonts/[name].[ext]'
          }
        }, {// bootstrap
          test : /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader : 'file',
          query : {
            limit : 10000,
            // 字体文件放置目录
            name : 'fonts/[name].[ext]'
          }
        }, {// bootstrap
          test : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader : 'url',
          query : {
            limit : 10000,
            mimetype : 'application/image/svg+xml',
            // 字体文件放置目录
            name : 'fonts/[name].[ext]'
          }
        }, {// font-awesome
          test : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader : "file",
          query : {
            limit : 10000,
            // 字体文件放置目录
            name : 'fonts/[name].[ext]'
          }
        }
    ]
	},
	externals: {
    	jquery: 'window.$'
	},
  	resolve: {
    	extensions: ['', '.js', '.json', '.scss', 'css']
  	},
  	plugins: [
    	new webpack.optimize.CommonsChunkPlugin('common.js'),//公共的代码
    	new ExtractTextPlugin("[name].css"),//分离css文件
    	new webpack.HotModuleReplacementPlugin()
    	//提取jquery，在每个文件前都加载，以防止第三方jquery插件不起作用
    	/*
    	改为html引入全局jquery
    	new webpack.ProvidePlugin({
      		$: "jquery",
      		jQuery: "jquery",
      		"window.jQuery": "jquery"
    	})
    	 */
  	],
  postcss: [
    require('autoprefixer')//调用autoprefixer插件
  ],
  //本地服务开启，用于调试界面
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  } 
}