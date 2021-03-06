var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: [
            path.resolve(__dirname, 'src/main.js')
        ]
    },
    devtool: 'cheap-source-map',
    output: {
      pathinfo: true,
        path: path.resolve(__dirname, 'dev'),
        publicPath: './dev/',
        library: '[name]',
        libraryTarget: 'umd',
        filename: '[name].js'
    },
    watch: true, 
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html',
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            hash: false
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: ['./', './dev']
            }
        })
    ],
    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') }
        ]
    }
}