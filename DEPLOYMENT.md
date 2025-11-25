# GitHub Pages 部署指南

## 项目准备情况

本项目已经配置好以下GitHub Pages部署所需的文件：

1. **构建脚本**：package.json中包含`npm run build`脚本
2. **CNAME文件**：包含自定义域名`ai-timeline.org`
3. **GitHub Actions Workflow**：配置了自动部署到GitHub Pages的工作流
4. **Vite配置**：设置了正确的base路径

## 部署步骤

### 1. 创建GitHub仓库

1. 登录您的GitHub账号
2. 创建一个新的仓库，名称建议为`ai-timeline`或您喜欢的名称
3. 选择是否将仓库设置为公开或私有（GitHub Pages对公共仓库是免费的）

### 2. 推送代码到GitHub仓库

在本地项目目录中执行以下命令：

```bash
# 初始化git仓库（如果尚未初始化）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始提交"

# 添加远程仓库
git remote add origin https://github.com/您的用户名/您的仓库名.git

# 推送代码到main分支
git push -u origin main
```

### 3. 配置GitHub Pages

1. 在GitHub仓库页面，点击顶部导航栏中的"Settings"
2. 在左侧导航中选择"Pages"
3. 在"Build and deployment"部分：
   - 确保"Source"选择的是"GitHub Actions"
   - 您应该能看到我们配置的"Deploy static content to Pages"工作流

### 4. 配置自定义域名（如需要）

> 注意：项目中已经包含CNAME文件，内容为`ai-timeline.org`。如果您不需要使用此域名或要使用其他域名，请修改或删除CNAME文件。

如果您想使用自己的域名：
1. 修改CNAME文件中的域名
2. 在您的域名注册商处，添加CNAME记录指向`您的用户名.github.io`
3. 在GitHub Pages设置页面的"Custom domain"部分输入您的域名
4. 启用"Enforce HTTPS"选项（如果可能）

### 5. 触发部署

1. 代码推送到main分支后，GitHub Actions工作流将自动触发
2. 您可以在仓库页面的"Actions"选项卡中查看部署进度
3. 部署完成后，您可以通过以下地址访问您的网站：
   - 如果使用GitHub Pages默认域名：`https://您的用户名.github.io/您的仓库名/`
   - 如果使用自定义域名：`https://ai-timeline.org`（或您的自定义域名）

## 手动触发部署

如果需要手动触发部署：
1. 进入仓库的"Actions"选项卡
2. 选择"Deploy static content to Pages"工作流
3. 点击"Run workflow"按钮，然后再次点击"Run workflow"确认

## 本地测试

在部署前，建议在本地测试构建：

```bash
# 安装依赖
npm ci

# 构建项目
npm run build

# 本地预览构建结果
npm run preview
```

然后在浏览器中访问`http://localhost:4173`查看预览效果。