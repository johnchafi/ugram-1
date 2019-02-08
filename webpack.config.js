const TerserPlugin = require('terser-webpack-plugin');

var PROD = true;

module.exports = {
    entry: './src/Index.tsx',
    output: {
        filename: PROD ? './dist/js/bundle.min.js' : './dist/js/bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
    },

    devServer: {
        historyApiFallback: true,
    },
    optimization: {
        minimizer: [ new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: 6,
            },
        })],
    },
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
                    }
                }],
            }
        ]
    }
};
