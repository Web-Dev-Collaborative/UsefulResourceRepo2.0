'use strict';

var webpack             = require('webpack'),
    HtmlWebpackPlugin   = require('html-webpack-plugin'),
    path                = require('path'),
    staticResourcePath  = path.join(__dirname, 'static'),
    srcPath             = path.join(__dirname, 'src'),
    nodeModulesPath     = path.join(__dirname, 'node_modules');
var isProduction = function () {
    return process.env.NODE_ENV === 'production';
}

var modulePath = { // production
        React                       : path.join(nodeModulesPath, 'react/dist/react.min.js'),
        React_addons                : path.join(nodeModulesPath, 'react/dist/react-with-addons.min.js'),
        React_Router                : path.join(nodeModulesPath, 'react-router/umd/ReactRouter.min.js')
    },
    moduleAlias = isProduction() ?
                  { // production
                      'react/addons'                : [modulePath.React_addons],
                      'react'                       : [modulePath.React],
                      'react-router'                : [modulePath.React_Router],
                      // static resources
                      'static'                      : staticResourcePath
                  } :
                  {
                      // static resources
                      'static'                      : staticResourcePath
                  },
    noParse = isProduction() ?
                  [
                    modulePath.React,
                    modulePath.React_addons,
                    modulePath.React_Router
                  ] : [];

// Project config
var page = {
  settings: {
    AjaxDomain: 'mobile.' + 'tonghs.me'//'angelcrunch.com'// tonghs.me
  }
};

var defineStatePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'production' ? 'false' : 'true')),
    __AjaxDomain: JSON.stringify(page.settings.AjaxDomain)
});

module.exports = {
    target: 'web',
    cache: true,
    entry: {
        module  : path.join(srcPath, 'module.js'),
        common  : ['jquery', 'react', 'react-router', 'alt', 'react-mixin', 'utils/titleHelper']
    },
    resolve: {
        root: srcPath,
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', 'src'],
        alias: moduleAlias
    },
    output: {
        path: path.join(__dirname, 'tmp'),
        publicPath: '/',
        filename: '[name].[hash].js',
        library: ['Example', '[name]'],
        pathInfo: true
    },

    module: {
        loaders: [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory' },
            {
                test: /.*\/(react-mixin)\/.*\.js$/,
                exclude: /.spec.js/,
                loader: 'uglify'
            },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
            { test: /\.css$/, loader: 'style!css' },
            {
                test: /.*\.(png|gif|svg)$/i,
                loaders: [
                  'file?hash=sha512&digest=hex&name=[hash].[ext]',
                  'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            },
            {
              test: /\.(jpg)$/,
              loader: 'url?limit=25000'
            },
            {
              test: /\.(woff|ttf)$/,
              loader: 'url?limit=100000'
            }
            
        ],
        noParse: noParse
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new HtmlWebpackPlugin({
            inject: true,
            excludeChunks: ['test'],
            template: 'src/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.NoErrorsPlugin(),
        defineStatePlugin
    ],
    debug: isProduction() ? false : true,
    devtool: isProduction() ? '' 
                            : 'eval-cheap-module-source-map',
    devServer: {
        port: 9090,
        contentBase: './tmp',
        historyApiFallback: true
    }
};