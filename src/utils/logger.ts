import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// 1. Định nghĩa các level log (theo chuẩn Syslog hoặc npm)
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// 2. Định nghĩa màu sắc cho Console (giúp dễ đọc khi dev)
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Liên kết màu với Winston
winston.addColors(colors);

// 3. Cấu hình Format
const format = winston.format.combine(
  // Thêm timestamp format chuẩn
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // Xử lý lỗi (stack trace) nếu có
  winston.format.errors({ stack: true }),
  // Format log message
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message}`,
  ),
);

// 4. Xác định môi trường để log level phù hợp
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'info';
};

// 5. Cấu hình Transports (Nơi lưu log)
const transports = [
  // A. In ra Console (Luôn cần thiết)
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }), // Tô màu toàn bộ dòng
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
      ),
    ),
  }),

  // B. Lưu vào File (Chỉ dùng khi chạy Production hoặc cần lưu lại)
  // File log tổng hợp (xoay vòng theo ngày)
  new DailyRotateFile({
    filename: path.join(process.cwd(), 'logs', 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true, // Nén file cũ
    maxSize: '20m',      // 20MB thì cắt file
    maxFiles: '14d',     // Giữ trong 14 ngày
    level: 'http',       // Ghi từ http, info, warn, error
  }),

  // File log lỗi riêng biệt (để dễ debug)
  new DailyRotateFile({
    filename: path.join(process.cwd(), 'logs', 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    level: 'error',      // Chỉ ghi error
  }),
];

// 6. Khởi tạo Logger Instance
const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

// 7. Tạo Stream để tích hợp với Morgan (HTTP Logger)
export const stream = {
  write: (message: string) => {
    // Morgan thường có ký tự xuống dòng ở cuối, ta trim đi cho đẹp
    Logger.http(message.trim());
  },
};

export default Logger;