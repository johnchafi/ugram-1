const webpack = require("webpack");

const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin')
const S3Plugin = require('webpack-s3-plugin');

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
            jsExtension: '.gz',
        }),
        new webpack.DefinePlugin({ // <-- key to reducing React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new HtmlWebpackChangeAssetsExtensionPlugin(),
        new S3Plugin({
            s3Options: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
            include: /.*\.(html|gz)/,
            s3UploadOptions: {
                Bucket: 'ugram-team02',
                ContentEncoding(fileName) {
                    if (/\.gz/.test(fileName))
                        return 'gzip'
                },

                ContentType(fileName) {
                    if (/\.js/.test(fileName))
                        return 'application/javascript'
                    else
                        return 'text/html'
                }
            }
        })
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
