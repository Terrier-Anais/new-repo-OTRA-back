import winston from 'winston';
import 'winston-daily-rotate-file';

const {
  combine, timestamp, simple, json,
} = winston.format;

const logger = winston.createLogger({
  level: 'http',
  format: winston.format.json(),
  defaultMeta: { service: 'oroad' },
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      level: 'error',
      datePattern: 'YYYY-MM-DD:HH:mm',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '10',
      format: combine(
        timestamp(),
        json(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/combined.log-%DATE%',
      frequency: '1m',
      datePattern: 'YYYY-MM-DD-HH:mm',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '10',
      format: combine(
        timestamp(),
        json(),
      ),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: combine(
      timestamp(),
      simple(),
    ),
  }));
}

export default logger;
