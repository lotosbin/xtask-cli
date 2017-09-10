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

命令：
  init            init task config
  list            list all task                                     [aliases: l]
  pop             pop the top task
  push [message]  list all task
  top             top task                                          [aliases: t]

选项：
  --help  显示帮助信息                                                    [布尔]

缺少 non-option 参数：传入了 0 个, 至少需要 1 个

```

clip to clipboard
```bash
t pop -h

/usr/local/bin/t pop

选项：
  -h, --help, --help  显示帮助信息                                        [布尔]
  --clip, -c          clip to clipboard                                   [布尔]


```
