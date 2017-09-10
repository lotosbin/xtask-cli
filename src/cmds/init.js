import fs from 'fs';
import path from "path";
import shell from 'shelljs';

exports.command = 'init';

exports.describe = 'init task config';

exports.builder = yargs => {
    return yargs.help('h')
        .alias('h', 'help')
};
exports.handler = function (argv) {
    console.log('init');
    let pwd = shell.pwd();
    if (pwd.code !== 0) {
        console.error(pwd.stderr);
        return;
    }
    let path = path.join(pwd.stdout, '.xtask');
    if (fs.existsSync(path)) {
        console.warn('.xtask already exists.');
        return
    }
    fs.mkdirSync(path);
    const jsonfile = require('jsonfile');
    const config = {tasks: []};
    const file = path.join(path, 'data.json');
    jsonfile.writeFile(file, config, {spaces: 2}, function (err) {
        console.error(err)
    });
};