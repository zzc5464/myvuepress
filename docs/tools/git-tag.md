# git tag


```sh

# 展示所有 tag
git tag 

# 创建本地
git tag -a [tag-name] -m '1.4.0版本提测'

# 提交本地所有tag到远程
git push origin --tags

# 查看某个 tag
git show test-20190723-v1.4.0

# 删除本地
git tag -d [tag-name]

# 删除线上 tag
git tag -d [tag-name]
git push origin :refs/tags/[tag-name]

# 拉取线上版本 tag
git fetch origin tag [tag-name]
```