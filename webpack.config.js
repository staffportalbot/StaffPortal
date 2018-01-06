const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './web/src/js/Components/Index.js',
    output: {
        filename: './web/static/js/bundle.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    'presets': [
                        'es2015',
                        'es2016',
                        'es2017',
                        'stage-0',
                        'react'
                    ],
                    'plugins': [
                        'transform-decorators-legacy'
                    ]
                }
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader",
                })
            }
        ]
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        new ExtractTextPlugin({
            filename: './web/static/css/styles.css',
            allChunks: true
        })
    ]
};