import ncp from "copy-paste";
import fs from "fs";
import path from "path";

eval(fs.readFileSync(path.join(__dirname, '../util.js')) + '');
exports.command = 'shift';

exports.describe = 'shift the bottom task';

exports.builder = yargs => {
    return yargs.option('clip', {
        alias: 'c',
        describe: 'clip to clipboard',
        type: 'boolean'
    })
        .help('h')
        .alias('h', 'help')
};

exports.handler = function (argv) {
    global.readConfig(function (err, config) {
        if (err) {
            console.error(err);
            return
        }
        if (!config.tasks) {
            config.tasks = [];
        }
        let popTask = config.tasks.shift();
        if (!popTask) {
            console.info("tasks is empty");
            return
        }
        console.info('shift: ' + popTask);
        if (argv.clip) {
            ncp.copy(popTask, () => {
                console.info(`task '${popTask}' already copied`)
            })
        }
        global.writeConfig(config, function (err) {
            if (err) {
                console.error(err);
                return
            }
            console.info('list:\n');
            const tasks = config.tasks;
            for (let index in tasks.reverse()) {
                let task = tasks[index];
                console.log(task);
            }
        });
    });

};