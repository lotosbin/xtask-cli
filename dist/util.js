"use strict";

var _findParentDir = require("find-parent-dir");

var _findParentDir2 = _interopRequireDefault(_findParentDir);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _shelljs = require("shelljs");

var _shelljs2 = _interopRequireDefault(_shelljs);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _jsonfile = require("jsonfile");

var _jsonfile2 = _interopRequireDefault(_jsonfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.getFile = function getFile() {
    let pwd = _shelljs2.default.pwd();
    if (pwd.code !== 0) {
        console.error(pwd.stderr);
        return;
    }
    let dir;
    if (_fs2.default.existsSync(_path2.default.join(pwd.stdout, '.xtask'))) {
        dir = pwd.stdout;
    } else {
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
    }
    const file = _path2.default.join(dir, '.xtask/data.json');
    return file;
};
global.readConfig = function (callback) {
    const file = global.getFile();
    if (!file) {
        let error = `file ${file} is not exist, may be is not init,`;
        if (callback) {
            callback(error);
        } else {
            console.error(error);
        }

        return;
    }
    const config = _jsonfile2.default.readFileSync(file);
    if (!config.tasks) {
        config.tasks = [];
    }
    if (callback) {
        callback(null, config);
    }
    return config;
};
global.writeConfig = function (config, callback) {
    const file = global.getFile();
    if (!file) {
        console.error(`file ${file} is not exist, may be is not init,`);
        return;
    }
    _jsonfile2.default.writeFile(file, config, { spaces: 2 }, callback);
};