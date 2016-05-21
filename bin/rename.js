#!/usr/bin/env node

// var path = require('path')
var fs = require('fs')
var picPat = /tex_([0-9]+).png/
function rename (path) {
  fs.readdir(path, function (err, files) {
    console.log('files: ', files)
    files.forEach(function (file) {
      console.log('path: ', path, 'file: ',file)
      var oldPath = path + file;
      if (picPat.test(file)) {
          var num = file.match(picPat)[1]
          fs.rename(oldPath, `${path}txt_${num}.png`, function (e) {
              
          })
      }
    });
  });
}

rename('img/');