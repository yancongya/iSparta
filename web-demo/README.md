# iSparta Web版本

这是iSparta的Web版本演示项目，使用Vite构建系统、Vue 3前端框架和Express.js后端。

## 项目结构

```
isparta-web/
├── frontend/         # 前端Vue 3项目
│   ├── public/       # 静态资源
│   ├── src/          # 源代码
│   │   ├── assets/   # 资源文件
│   │   ├── components/ # 组件
│   │   ├── views/    # 页面
│   │   ├── store/    # Pinia状态管理
│   │   ├── locales/  # 国际化文件
│   │   ├── utils/    # 工具函数
│   │   ├── App.vue   # 根组件
│   │   └── main.js   # 入口文件
│   ├── index.html    # HTML模板
│   └── vite.config.js # Vite配置
├── backend/          # 后端Express项目
│   ├── controllers/  # 控制器
│   ├── routes/       # 路由
│   ├── services/     # 服务
│   ├── utils/        # 工具函数
│   ├── processors/   # 图片处理模块
│   └── server.js     # 入口文件
└── README.md         # 项目说明
```

## 功能特性

- PNGs转换APNG - 将多张PNG合并成一个APNG动图
- PNGs单独设置帧频 - 可以给每一帧单独设置帧频
- PNG、GIF转换WebP - 将PNG、GIF转换为WebP格式
- APNG转换Animated WebP - 将APNG动图转换为Animated WebP动图
- PNG和GIF无损压缩 - 减少图片大小

## 技术栈

### 前端
- **构建工具**：Vite
- **前端框架**：Vue 3
- **UI库**：Element Plus
- **状态管理**：Pinia
- **路由**：Vue Router 4.x
- **国际化**：Vue I18n 9.x

### 后端
- **运行环境**：Node.js
- **Web框架**：Express.js
- **文件处理**：multer
- **图片处理**：原iSparta处理工具的Node.js封装

## 开发指南

### 前端开发

```bash
cd frontend
npm install
npm run dev
```

### 后端开发

```bash
cd backend
npm install
npm run dev
```

## 部署指南

### 前端构建

```bash
cd frontend
npm run build
```

### 后端部署

```bash
cd backend
npm run start
```

## 贡献指南

欢迎提交问题和功能请求。如果您想贡献代码，请遵循以下步骤：

1. Fork项目
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

## 许可证

与原iSparta项目保持一致的开源许可证。

## 致谢

- 原iSparta项目及其贡献者
- 所有使用的开源工具和库