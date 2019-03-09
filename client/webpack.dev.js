const webpack = require("webpack");

const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/Index.tsx',
    output: {
        filename: '[name].[hash:8].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
    },

    devServer: {
        historyApiFallback: true,
        publicPath: '/'
    },
    optimization: {
        minimizer: [new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: 6,
            },
        })],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
        }),
    ],
    module: {
        rules: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {test: /\.(css|scss)$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader', options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader', options: {
                        sourceMap: true
                    },
                }],
            },
            {test: /\.(jpe?g|gif|png|svg)$/, loader: "file-loader?name=./static/img/[name].[ext]"}
        ]
    }
};
