import findParentDir from "find-parent-dir";
import path from "path";
import shell from 'shelljs';
import fs from 'fs';

import json from "jsonfile";

global.getFile = function getFile() {
    let pwd = shell.pwd();
    if (pwd.code !== 0) {
        console.error(pwd.stderr);
        return;
    }
    let dir;
    if (fs.existsSync(path.join(pwd.stdout, '.xtask'))) {
        dir = pwd.stdout
    } else {
        try {
            dir = findParentDir.sync(pwd.stdout, '.xtask');
            if (!dir) {
                console.error('cannot find .xtask folder,please use t init command in project root')
                return;
            }
        } catch (err) {
            console.error('error', err);
            return
        }
    }
    const file = path.join(dir, '.xtask/data.json');
    return file;
};
global.readConfig = function (callback) {
    const file = global.getFile();
    if (!file) {
        let error = `file ${file} is not exist, may be is not init,`;
        if (callback) {
            callback(error)
        } else {
            console.error(error)
        }

        return
    }
    const config = json.readFileSync(file);
    if (!config.tasks) {
        config.tasks = [];
    }
    if (callback) {
        callback(null, config);
    }
    return config;
}
global.writeConfig = function (config, callback) {
    const file = global.getFile();
    if (!file) {
        console.error(`file ${file} is not exist, may be is not init,`)
        return
    }
    json.writeFile(file, config, {spaces: 2}, callback);
}