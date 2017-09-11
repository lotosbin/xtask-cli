'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.command = 'init';

exports.describe = 'init task config';

exports.builder = yargs => {
    return yargs.help('h').alias('h', 'help');
};
exports.handler = function (argv) {
    console.log('init');
    let pwd = _shelljs2.default.pwd();
    if (pwd.code !== 0) {
        console.error(pwd.stderr);
        return;
    }
    let xpath = _path2.default.join(pwd.stdout, '.xtask');
    if (_fs2.default.existsSync(xpath)) {
        console.warn('.xtask already exists.');
        return;
    }
    _fs2.default.mkdirSync(xpath);
    const jsonfile = require('jsonfile');
    const config = { tasks: [] };
    const file = _path2.default.join(xpath, 'data.json');
    jsonfile.writeFile(file, config, { spaces: 2 }, function (err) {
        console.error(err);
    });
};