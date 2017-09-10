'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.command = 'init';

exports.describe = 'init task config';

exports.builder = {};
exports.handler = function (argv) {
    console.log('init');
    let path = '.xtask';
    if (_fs2.default.existsSync(path)) {
        console.warn('.xtask already exists.');
        return;
    }
    _fs2.default.mkdirSync(path);
    const jsonfile = require('jsonfile');
    const config = { tasks: [] };
    const file = '.xtask/data.json';
    jsonfile.writeFile(file, config, { spaces: 2 }, function (err) {
        console.error(err);
    });
};