import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

class SimpleLogger {
  private logDir:string
  private levels = ['info', 'error', 'warn', 'debug'] as const
  private colors = {
    // ANSI 转义序列（ANSI Escape Sequences），用于控制终端（命令行）的文本颜色和样式
    error: '\x1b[31m', // 红色 
    warn: '\x1b[33m',  // 黄色
    info: '\x1b[36m',  // 青色
    debug: '\x1b[35m', // 紫色
    reset: '\x1b[0m'   // 重置
  }

  constructor () {
    // import.meta.url: ES 模块的原生属性，返回当前模块文件的完整的 file://URL。
    // fileURLToPath: Node.js 的 url模块中的函数，用于将 file://URL 转换为文件系统路径。
    const __filename = fileURLToPath(import.meta.url);
    this.logDir = path.join(path.dirname(__filename), '../../logs');
    
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private writeToFile(level: string, message: string, meta?: any) {
    const timestamp = new Date().toISOString();
    // const logContent = JSON.stringify({
    //   timestamp,
    //   level,
    //   message,
    //   ...meta
    // }) + '\n';

    const logContent = `[${timestamp}] ${JSON.stringify({message, ...meta})} \n`

    const filename = `${level}.log`;
    const filepath = path.join(this.logDir, filename);
    
    fs.appendFileSync(filepath, logContent, 'utf8');
  }

  private formatConsole(level: string, message: string) {
    const timestamp = new Date().toISOString();
    const color = this.colors[level as keyof typeof this.colors] || this.colors.reset;
    return `${color}[${timestamp}] [${level.toUpperCase()}] ${message}${this.colors.reset}`;
  }

  log(level: string, message: string, meta?: any) {
    // 控制台输出
    console.log(this.formatConsole(level, message));
    
    // 文件输出
    this.writeToFile(level, message, meta);
    
    // HTTP 请求日志特殊处理
    if (meta?.req) {
      this.logRequest(meta.req, meta.res, meta.duration);
    }
  }

  error(message: string, error?: Error, meta?: any) {
    this.log('error', message, { 
      ...meta, 
      stack: error?.stack 
    });
  }

  warn(message: string, meta?: any) {
    this.log('warn', message, meta);
  }

  info(message: string, meta?: any) {
    this.log('info', message, meta);
  }

  debug(message: string, meta?: any) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, meta);
    }
  }

  logRequest(req: any, res: any, duration?: number) {
    const message = `${req.method} ${req.url} ${res.statusCode}`;
    this.info(message, {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    });
  }


}

export const logger = new SimpleLogger()