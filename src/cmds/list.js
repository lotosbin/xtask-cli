import findParentDir from "find-parent-dir";

exports.command = ['list', 'l'];

exports.describe = 'list all task';

exports.builder = yargs => {
    return yargs.alias('list', 'l')
        .help('h')
        .alias('h', 'help')
}
exports.handler = function (argv) {
    let dir;
    try {
        dir = findParentDir.sync(__dirname, '.xtask');
        if (!dir) {
            console.error('cannot find .xtask folder,please use t init command in project root')
            return;
        }
    } catch (err) {
        console.error('error', err);
        return
    }
    const json = require('jsonfile');
    const file = dir + '.xtask/data.json';
    const config = json.readFileSync(file);
    const tasks = config.tasks || [];
    for (let index in tasks.reverse()) {
        const task = tasks[index];
        console.log(task);
    }
};