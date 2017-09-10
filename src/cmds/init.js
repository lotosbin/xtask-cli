import fs from 'fs';

exports.command = 'init';

exports.describe = 'init task config';

exports.builder = {};
exports.handler = function (argv) {
    console.log('init');
    let path = '.xtask';
    if (fs.existsSync(path)) {
        console.warn('.xtask already exists.');
        return
    }
    fs.mkdirSync(path);
    const jsonfile = require('jsonfile');
    const config = {tasks: []};
    const file = '.xtask/data.json';
    jsonfile.writeFile(file, config, {spaces: 2}, function (err) {
        console.error(err)
    });
};