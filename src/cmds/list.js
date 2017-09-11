var fs = require('fs');
var path = require('path');
eval(fs.readFileSync(path.join(__dirname, '../util.js')) + '');
exports.command = ['list', 'l'];

exports.describe = 'list all task';

exports.builder = yargs => {
    return yargs.alias('list', 'l')
        .help('h')
        .alias('h', 'help')
}
exports.handler = function (argv) {
    const file = global.getFile();
    if (!file) {
        console.error(`file ${file} is not exist, may be is not init,`)
    }
    const json = require('jsonfile');
    const config = json.readFileSync(file);
    const tasks = config.tasks || [];
    for (let index in tasks.reverse()) {
        const task = tasks[index];
        console.log(`${index}\t: ${task}`);
    }
};