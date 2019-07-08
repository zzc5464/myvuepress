# git 自动补全脚本

> mac 版 。

> [原文地址](https://www.cnblogs.com/liboxncg/p/6740548.html)

## 安装 homebrew

用 mac 开发必须用到的软件包下载工具，[官网](https://brew.sh/index_zh-cn.html)

- 打开终端输入

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

安装过程中需要输入用户名密码

<img :src="$withBase('/assets/tools/git-completion01.png')" alt="brew安装过程">

- 测试安装成功

```bash
brew
```

如图即安装成功
<img :src="$withBase('/assets/tools/git-completion02.png')" alt="brew安装过程">

## 安装 bash-completion

```bash
# 安装
brew install bash-completion
# 查看是否安装成功
brew info bash-completion

```

- 打开 bash_profile文件

`open ~/.bash_profile`

将一下命令复制到文件底部

```bash
if [ -f $(brew --prefix)/etc/bash_completion ]; then
  . $(brew --prefix)/etc/bash_completion
fi
```

复制完后类似

```bash
# .bash_profile
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
if [ -f $(brew --prefix)/etc/bash_completion ]; then
    . $(brew --prefix)/etc/bash_completion
  fi
if [ -f ~/.git-completion.bash ]; then
   . ~/.git-completion.bash
fi
```

重启终端

### 复制 github 配置文件

[git-completion.bash](https://github.com/git/git/blob/master/contrib/completion/git-completion.bash)


新建本地文件为 `git-completion.bash`,将 github 上的 `git-completion.bash` 内容复制进去。

将此文件用命令的方式复制到 `~/` 目录下的 `.git-completion.bash`

```bash
touch 你的路径/git-completion.bash
# 复制 github 上的内容


cp 你的路径/git-completion.bash ~/.git-completion.bash

```

### 修改 .bashrc 配置

`open ~/.bashrc`

如果没有该文件

`touch ~/.bashrc`

复制如下内容

```bash
source ~/.git-completion.bash
```

打开终端

```bash
source ~/.git-completion.bash
```

将以下内容添加到`~/.bash_profile`内容底部

```bash
if [ -f ~/.git-completion.bash ]; then
   . ~/.git-completion.bash
fi
```