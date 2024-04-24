export const env = process.env.NODE_ENV ?? 'dev';
export const isDev = env.startsWith('dev');
