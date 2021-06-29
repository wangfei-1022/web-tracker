const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    context: process.cwd(),
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'monitor.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        before(router) {
            router.get('/success', function (req, res) {
                res.json({ id: 1 });
            });
            router.post('/error', function (req, res) {
                res.sendStatus(500);
            });
        }
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head'
        })
    ]
}