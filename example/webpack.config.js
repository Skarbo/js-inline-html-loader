const path = require( 'path' );

module.exports = {
    entry: {
        'example': path.resolve( __dirname, 'example.js' ),
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname,
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /(node_modules)/,
                loader: 'js-inline-html-loader',
                enforce: 'pre', // enforce pre to do the inline before babel-loader
                options: { // use html-loader options
                    minimize: true,
                    removeComments: true,
                    exportAsEs6Default: true,
                    collapseWhitespace: true,
                },
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
        ]
    },
    resolveLoader: {
        alias: {
            'js-inline-html-loader': path.resolve( __dirname, '../index' ),
        }
    },
    mode: 'development',
    devtool: '',
};