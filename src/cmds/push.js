import ncp from "copy-paste";
import fs from "fs";
import path from "path";

eval(fs.readFileSync(path.join(__dirname, '../util.js')) + '');
exports.command = 'push [message]';

exports.describe = 'list all task';

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
    let task = argv.message;
    if (task) {
        global.readConfig(function (error, config) {
            if (error) {
                console.error(error)
                return
            }
            if (!config.tasks) {
                config.tasks = [];
            }
            config.tasks.push(task);
            if (argv.clip) {
                ncp.copy(task, () => {
                    console.info(`task '${task}' already copied`)
                })
            }
            global.writeConfig(config, function (err) {
                if (err) {
                    console.error(err);
                    return;
                }
                let tasks = config.tasks.reverse();
                for (let index in tasks) {
                    const task = tasks[index];
                    console.log(`${index}\t: ${task}`);
                }
            })
        });
    }
};