const path = require('path');
const { library } = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    entry: [ 
        './src/platapi.ts',
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'platapi.js',
        clean: true,
        globalObject: 'this',
        library: {
            name: 'platapi',
            type: 'umd',
        },
    },
};