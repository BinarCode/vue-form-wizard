var path = require("path");
var webpack = require("webpack");
var projectRoot = path.resolve(__dirname, '../');

var loaders = [
	{
		test: /\.vue$/,
		loader: 'vue-loader',
	},
	{
		test: /\.js$/,
		loader: 'babel-loader',
		include: projectRoot,
		exclude: /node_modules/
	},
	{
		test: /\.json$/,
		loader: 'json'
	},
	{ 
		test: /\.(woff2?|svg)$/, 
		loader: "url" 
		//loader: "url?limit=10000" 
	},
	{ 
		test: /\.(ttf|eot)$/, 
		loader: "url" 
	}
];

module.exports = {
	devtool: "source-map",
	
	entry: {
		example: path.resolve("dev", "example", "main.js")
	},

	output: {
		path: path.resolve("dev"),
		filename: "[name].js",
		publicPath: "/"
	},

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
                FULL_BUNDLE: true
            }
        }),
    ],

	module: {
		rules:loaders
	},
};
