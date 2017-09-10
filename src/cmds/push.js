import findParentDir from "find-parent-dir";

exports.command = 'push [message]';

exports.describe = 'list all task';

exports.builder = {
    banana: {
        default: 'cool'
    },
    batman: {
        default: 'sad'
    }
};

exports.handler = function (argv) {
    if (argv.message) {
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
        if (!config.tasks) {
            config.tasks = [];
        }
        config.tasks.push(argv.message);
        json.writeFile(file, config, {spaces: 2}, function (err) {
            if (err) {
                console.error(err)
                return
            }
            var tasks = config.tasks;
            for (var index in tasks.reverse()) {
                var task = tasks[index];
                console.log(task);
            }
        });
    }
};