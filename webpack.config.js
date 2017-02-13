/**
 * Created by FG0003 on 23/12/2016.
 */
'use strict'

const path  = require('path');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'resources/assets'),
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            /*{
                test: /\.html$/,
                loader: 'raw'
            },*/
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    limit: 10000,
                    name: '../img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.html$/,
                loader: 'file-loader',
                query: {
                    limit: 100000,
                    name: '../html/[name].[hash:7].[ext]'
                }
            }
        ]
    },
};