/*eslint-disable no-console */
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')

var app = express()

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/build',
  stats: {
    colors: true
  },
  watchOptions: {
    aggregateTimeout: 500,
    poll: true
  }
}))

var fs = require('fs')
var path = require('path')

app.use(express.static(__dirname))

app.listen(4000, '0.0.0.0', function () {
  console.log('Server listening on http://localhost:4000, Ctrl+C to stop')
})