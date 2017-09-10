'use strict';

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _findParentDir = require('find-parent-dir');

var _findParentDir2 = _interopRequireDefault(_findParentDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.command = 'info';

exports.describe = 'show info';

exports.builder = yargs => {
    return yargs.help('h').alias('h', 'help');
};
exports.handler = async function (argv) {
    let pwd = _shelljs2.default.pwd();
    if (pwd.code !== 0) {
        console.error(pwd.stderr);
        return;
    }
    let dir;
    try {
        dir = _findParentDir2.default.sync(pwd.stdout, '.xtask');
        if (!dir) {
            console.error('cannot find .xtask folder,please use t init command in project root');
            return;
        }
    } catch (err) {
        console.error('error', err);
        return;
    }
    console.info('path:' + dir);
};