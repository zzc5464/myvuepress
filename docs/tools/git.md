# git命令

```bash

git status
git chekcout xxx
git branch -a
git branch -b

# 恢复所有暂存区的文件
git chekcout .

# 发起一次新的 commit 来更正以前的提交
git revert <HEAD>

# 检出一个远程分支，当无法切换到某分支的时候可以试试
git checkout -b test origin/test

# 回退到上一步，修正后重新提交
git --amend

# 回滚远程提交的代码
git reset --hard HEAD^
git push origin master -f
# 回滚本地
git reset --hard 7f99bbd1ed53b61f9c13b43fc860c084186d97c6
# 删除分支
git branch -d [branch-name]

# 删除远程分支
git push origin --delete [branch-name]
git branch -dr [remote/branch]
查看远程仓库：$ git remote -v

添加远程仓库：$ git remote add [name] [url]

删除远程仓库：$ git remote rm [name]

修改远程仓库：$ git remote set-url --push [name] [newUrl]

拉取远程仓库：$ git pull [remoteName] [localBranchName]

推送远程仓库：$ git push [remoteName] [localBranchName]


```

## 合并

- 合并某一文件分支 `git checkout [分支] -- [路径]`

```sh
# 切换到你要合并文件的分支
# 用 checkout 获取目标分支的某个文件
git checkout 想要合并的分支 -- src/api
```



