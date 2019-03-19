const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

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
            {test: /\.(jpe?g|gif|png|svg)$/, loader: "file-loader?name=./static/img/[name].[ext]"},
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {
                            configuration: {
                                rules: {
                                    "eofline": true,
                                    "ban-ts-ignore": true,
                                    "no-trailing-whitespace": false,
                                    "comment-format": false,
                                    "quotemark": true,
                                    "no-console": true,
                                    "one-line": true,
                                    "no-consecutive-blank-lines": true,
                                    "curly": true,
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }
};
