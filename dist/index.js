#!/usr/bin/env node

console.log('hello world!!!');
var fs = require('fs')
var jsonfile = require('jsonfile')
var file = '.xtask'
if (!fs.existsSync(file)){
    fs.create
}
jsonfile.readFile(file, function (err, obj) {
    console.dir(obj)
})
console.dir(jsonfile.readFileSync(file))

var obj = {tasks: ['JP']}

jsonfile.writeFile(file, obj, {spaces: 2}, function (err) {
    console.error(err)
})