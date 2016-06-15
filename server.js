/*eslint-disable no-console */
var express = require('express')
var bodyParser = require('body-parser')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')
var config = require('./config')

var app = express()
var router = express.Router()

app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

if (config.dev) {
  app.use(webpackDevMiddleware(webpack(WebpackConfig), {
    publicPath: '/build',
    noInfo: true,
    stats: {
      colors: true
    },
    watchOptions: {
      aggregateTimeout: 500,
      poll: true
    }
  }))
}
var fs = require('fs')
var path = require('path')

require('./wechat')(app, router)




app.listen(4000, '0.0.0.0', function () {
  console.log('Server listening on http://localhost:4000, Ctrl+C to stop')
})