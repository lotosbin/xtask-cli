import shell from 'shelljs';
import findParentDir from "find-parent-dir";

exports.command = 'info';

exports.describe = 'show info';

exports.builder = yargs => {
    return yargs.help('h')
        .alias('h', 'help')
};
exports.handler = async function (argv) {
    let pwd = shell.pwd();
    if (pwd.code !== 0) {
        console.error(pwd.stderr);
        return;
    }
    let dir;
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
    console.info('path:' + dir)
};