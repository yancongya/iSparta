const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

// 创建Express应用
const app = express();
const port = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    fs.ensureDirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// 创建临时目录
const tempDir = path.join(__dirname, 'temp');
fs.ensureDirSync(tempDir);

// 创建输出目录
const outputDir = path.join(__dirname, 'output');
fs.ensureDirSync(outputDir);

// 静态文件服务
app.use('/output', express.static(outputDir));

// 路由

// 上传文件
app.post('/upload', upload.array('files'), (req, res) => {
  try {
    const files = req.files.map(file => ({
      id: uuidv4(),
      originalName: file.originalname,
      path: file.path,
      size: file.size,
      type: file.mimetype
    }));
    
    res.json({ success: true, files });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 转换文件
app.post('/convert', async (req, res) => {
  try {
    const { files, settings } = req.body;
    
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files provided' });
    }
    
    // 创建会话ID
    const sessionId = uuidv4();
    const sessionDir = path.join(outputDir, sessionId);
    fs.ensureDirSync(sessionDir);
    
    // 模拟转换过程
    // 在实际应用中，这里应该调用图片处理模块进行转换
    const results = [];
    
    for (const file of files) {
      // 为每个文件创建转换结果
      for (const format of settings.outputFormat) {
        const originalName = file.originalName;
        const baseName = originalName.substring(0, originalName.lastIndexOf('.'));
        const outputName = settings.outputName || baseName;
        const suffix = settings.outputSuffix ? `-${settings.outputSuffix}` : '';
        const convertedName = `${outputName}${suffix}.${format.toLowerCase()}`;
        
        // 在实际应用中，这里应该执行实际的转换
        // 这里只是复制原文件作为示例
        const outputPath = path.join(sessionDir, convertedName);
        await fs.copy(file.path, outputPath);
        
        results.push({
          id: uuidv4(),
          originalName,
          convertedName,
          format,
          url: `/output/${sessionId}/${convertedName}`,
          previewUrl: `/output/${sessionId}/${convertedName}`
        });
      }
    }
    
    res.json({ success: true, results, sessionId });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 清理会话
app.delete('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const sessionDir = path.join(outputDir, sessionId);
    
    if (await fs.pathExists(sessionDir)) {
      await fs.remove(sessionDir);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Session cleanup error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// 定期清理临时文件
setInterval(async () => {
  try {
    const uploadDir = path.join(__dirname, 'uploads');
    const files = await fs.readdir(uploadDir);
    
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    for (const file of files) {
      const filePath = path.join(uploadDir, file);
      const stats = await fs.stat(filePath);
      
      // 删除超过1小时的文件
      if (now - stats.mtimeMs > oneHour) {
        await fs.remove(filePath);
      }
    }
    
    // 清理超过24小时的输出目录
    const outputDirs = await fs.readdir(outputDir);
    const oneDay = 24 * 60 * 60 * 1000;
    
    for (const dir of outputDirs) {
      const dirPath = path.join(outputDir, dir);
      const stats = await fs.stat(dirPath);
      
      if (now - stats.mtimeMs > oneDay) {
        await fs.remove(dirPath);
      }
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}, 60 * 60 * 1000); // 每小时执行一次