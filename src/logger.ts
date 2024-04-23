import { createLogger, transports, format } from 'winston';

const env = process.env.NODE_ENV ?? 'dev';
const isDev = env.startsWith('dev');

export default createLogger({
  level: isDev ? 'debug' : 'info',
  format: format.combine(
    format.colorize(),
    format.simple(),
  ),
  transports: [
    new transports.Console(),
  ],
});
