/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
var webpack = require('webpack')
var path = require('path')
// var version = require("./package.json").version;
// var banner = "/**\n" + " * vue-form-generator v" + version + "\n" + " * https://github.com/icebob/vue-form-generator\n" + " * Released under the MIT License.\n" + " */\n";
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StatsPlugin = require('stats-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const devMode = process.env.NODE_ENV !== 'production'
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

var loaders = [
  {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
		  loader: 'babel-loader',
		  options: {
    presets: [
			  ['@babel/preset-env', { targets: 'defaults' }]
    ]
		  }
    }
  },
  {
    test: /\.css$/i,
    use: [
      'vue-style-loader',
      {
        loader: MiniCssExtractPlugin.loader
      },
      'css-loader'
    ]
  },

  {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      'css-loader',
      'sass-loader'
    ]
  },

  {
    test: /\.s[ac]ss$/i,
    use: [
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          webpackImporter: false,
          sassOptions: {
            outputStyle: 'compressed',
            indentedSyntax: false,
            includePaths: ['src/assets', 'src/assets/form-wizard']
          },
          implementation: require('sass')
        }
      }
    ]
  },

  {
    test: /\.vue?$/,
    use: [
      'vue-loader'
	  // Translates CSS into CommonJS
    ]
  }
]

module.exports = [
  {
    entry: './src/index.js',
    mode: 'production',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'vue-form-wizard.js',
      library: 'VueFormWizard',
      libraryTarget: 'umd'
    },

    optimization: {
      moduleIds: 'named'
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
		/*	new webpack.BannerPlugin(banner, {
				raw: true
			}), */
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({ filename: 'vue-form-wizard.mine.css', chunkFilename: '[id].css' }),
      new StatsPlugin({filename: './stats.json',
        chunkModules: true
				// exclude: [/node_modules[\\\/]react/]
      })
    ],

    module: {
      rules: loaders
    }

  }
]
