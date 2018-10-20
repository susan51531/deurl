#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var glob = require('glob');

var cwd = process.cwd();
process.argv.slice(2).forEach(function(src) {
    glob(src, {
        cwd: cwd
    }, function(err, files) {
        if (!err) {
            files.forEach(rename);
        }
    });
});

function rename(src) {
    var dst = decodeURIComponent(src);
    if (dst !== src) {
        console.log(src, ' ==> ', dst);
        var target = path.resolve(dst);
        if (fs.existsSync(target)) {
            console.log(dst, ' is exists');
            return;
        }
        fs.renameSync(path.resolve(src), target);
    }
}
