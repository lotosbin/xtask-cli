import fs from "fs";
import path from "path";

eval(fs.readFileSync(path.join(__dirname, '../util.js')) + '');
exports.command = ['top', 't'];

exports.describe = 'top task';

exports.builder = yargs => {
    return yargs.option('clip', {
        alias: 'c',
        describe: 'clip to clipboard',
        type: 'boolean'
    })
        .help('h')
        .alias('h', 'help');
};
const ncp = require("copy-paste");

exports.handler = function (argv) {
    global.readConfig(function (err, config) {
        if (err) {
            console.error(err);
            return
        }
        const tasks = config.tasks || [];
        let task = tasks[0];
        if (!task) {
            console.info("there is no task current");
            return
        }
        console.log(task);
        if (argv.clip) {
            ncp.copy(task, () => {
                console.info(`task '${task}' already copied`)
            })
        }
    });

};