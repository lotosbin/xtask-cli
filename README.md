# xtask-cli
task todo manage for command line , task stack pattern ,task cycle patter ,.....

[![npm version](https://badge.fury.io/js/xtask-cli.svg)](https://badge.fury.io/js/xtask-cli)
[![GitHub version](https://badge.fury.io/gh/lotosbin%2Fxtask-cli.svg)](https://badge.fury.io/gh/lotosbin%2Fxtask-cli)

# Install
```bash
yarn global add xtask-cli
```
or
```bash
npm install --global xtask-cli
```

# Usage
```bash
t -h
/usr/local/bin/t <cmd> [args]

Commands:
  cycle              cycle the task,equal pop then unshift.if --reverse ,equal
                     shift then push
  info               show info
  init               init task config
  list               list all task                                  [aliases: l]
  pop                pop the top task
  push [message]     list all task
  shift              shift the bottom task
  top                top task                                       [aliases: t]
  unshift [message]  unshift a task

Options:
  -h, --help  Show help                                                [boolean]

copyright 2017 (c) liubinbin<lotosbin@gmail.com>


```

clip to clipboard
```bash
t pop -h

/usr/local/bin/t pop

选项：
  -h, --help, --help  显示帮助信息                                        [布尔]
  --clip, -c          clip to clipboard                                   [布尔]


```
