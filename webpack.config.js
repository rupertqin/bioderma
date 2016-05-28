var path = require('path');

var SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    entry: {
        app: ["./src/js/main.js"]
    },
    output: {
        path: __dirname + '/build/js/',
        filename: "[name].bundle.js",
        publicPath: '/build/js',
        sourceMapFilename: '[file].map'
    },
    devtool: 'source-map',
    resolve: {
        modulesDirectories: ["web_modules", "node_modules", "spritesmith-generated"]
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: 'style!raw!autoprefixer?{browsers:["safari >= 7", "Firefox 15", "ie >= 8", "chrome >= 34"]}!sass' },
            { test: /\.css$/, loader: 'style!raw' },
            // { test: /\.(png|gif|jpg)$/, loader: 'file?name=img/[name].[ext]&path=../../img/[name].[ext]' },
            { test: /\.png$/, loader: 'file?name=i/[hash].[ext]' },
            { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel'}
        ]
    },
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'img'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'build/img/sprite.png'),
                css: [[path.resolve(__dirname, 'build/css/sprite.css'), {
                    format: 'css',
                    formatOpts: {
                        cssSelector: function(sprite) {
                            return '.' + sprite.name.replace('_', '-')
                        }
                    }
                }]]
            },
            apiOptions: {
                cssImageRef: "build/img/sprite.png"
            }
            
        })
    ],
    devServer: {
        contentBase: "./",
        port: "4000",
        host: "0.0.0.0"
    }
};