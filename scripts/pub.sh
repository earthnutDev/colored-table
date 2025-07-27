#!/bin/bash

CHECK_VERSION="@qqi/check-version"
# 安装  

pnpm dlx "$CHECK_VERSION" -v
tag=""
if ! tag=$(pnpm dlx "${CHECK_VERSION}" c=. 2>&1); then
    echo "未通过版本校验：$tag"
    exit 0
fi
echo "获取🉐发布标签为 ${tag}"
# 依赖安装
# npm ci
pnpm install --frozen-lockfile --prod=false
# 构建项目
if ! pnpm run build; then 
  echo "构建失败" 
  exit 0
fi

# 切换到构建目录
if [ ! -d "dist" ]; then 
  echo "未找到 dist 构建码"
  exit 0
fi

publish() {
  cd "dist"
  echo "开始发布 npm 包 ${tag} 版本"
  if ! pnpm publish --provenance --access public --tag "${tag}" --no-git-checks; then
    echo "发布失败" 
    exit 1
  fi
  cd ../
}

# 确保脚本在遇见错误时立即退出
set -e
publish

node ./scripts/change-name.js

publish

echo "🚀🚀  发布成功，完结 🎉🎉 撒花 🎉🎉"

