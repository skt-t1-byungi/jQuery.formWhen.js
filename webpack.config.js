var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var BannerPlugin = require("webpack/lib/BannerPlugin");

// webpack.config.js
module.exports = {
    entry: './src/JqueryWrapper.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'jQuery.formWhen.min.js',
        libraryTarget: "umd"
    },
    externals: {
        "jquery": "jQuery"
    },
    plugins: [
        new UglifyJsPlugin(),
        new BannerPlugin('jQuery.formWhen.js\nsertion@innorix.com\nhttps://github.com/skt-t1-byungi/jQuery.formWhen')
    ]
};