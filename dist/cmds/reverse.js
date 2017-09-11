'use strict';

var fs = require('fs');
var path = require('path');
eval(fs.readFileSync(path.join(__dirname, '../util.js')) + '');
exports.command = ['reverse'];

exports.describe = 'reverse all task';

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

        config.tasks = config.tasks.reverse();
        global.writeConfig(config, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            console.info('list:\n');
            let tasks = config.tasks.reverse();
            for (let index in tasks) {
                const task = tasks[index];
                console.log(`${index}\t: ${task}`);
            }
        });
    });
};