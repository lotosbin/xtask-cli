'use strict';

var fs = require('fs');
var path = require('path');
eval(fs.readFileSync(path.join(__dirname, '../util.js')) + '');
exports.command = ['list', 'l'];

exports.describe = 'list all task';

exports.builder = yargs => {
    return yargs.help('h').alias('h', 'help');
};
exports.handler = function (argv) {
    global.readConfig(function (error, config) {
        if (error) {
            console.error(error);
            return;
        }
        if (!config.tasks) {
            config.tasks = [];
        }

        let tasks = config.tasks.reverse();
        for (let index in tasks) {
            const task = tasks[index];
            console.log(`${index}\t: ${task}`);
        }
    });
};