// lib/logger.ts
// Sistema de logs estruturados que substitui console.log
// Em produção, envia logs para serviços externos

import winston from 'winston';

// Definir níveis de log (do menos para o mais grave)
const levels = {
  error: 0,    // 🔴 Erros críticos
  warn: 1,     // 🟡 Avisos importantes
  info: 2,     // 🔵 Informações gerais
  http: 3,     // 🌐 Requisições HTTP
  debug: 4,    // 🐛 Debug detalhado
};

// Cores para cada nível (facilita leitura no terminal)
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Formato customizado dos logs
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Formatos diferentes para desenvolvimento e produção
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let metaString = '';
    if (Object.keys(meta).length > 0) {
      metaString = '\n' + JSON.stringify(meta, null, 2);
    }
    return `[${timestamp}] ${level}: ${message}${metaString}`;
  })
);

const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Configurar transportes (onde os logs vão)
const transports = [
  // Sempre escrever no console
  new winston.transports.Console({
    format: process.env.NODE_ENV === 'production' ? prodFormat : devFormat,
  }),
  
  // Em produção, salvar erros em arquivo
  ...(process.env.NODE_ENV === 'production'
    ? [
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: prodFormat,
        }),
        new winston.transports.File({
          filename: 'logs/all.log',
          format: prodFormat,
        }),
      ]
    : []),
];

// Criar o logger
const Logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels,
  format,
  transports,
});

// Wrapper com métodos úteis
export const logger = {
  // Logs básicos
  error: (message: string, meta?: any) => {
    Logger.error(message, meta);
  },
  
  warn: (message: string, meta?: any) => {
    Logger.warn(message, meta);
  },
  
  info: (message: string, meta?: any) => {
    Logger.info(message, meta);
  },
  
  http: (message: string, meta?: any) => {
    Logger.http(message, meta);
  },
  
  debug: (message: string, meta?: any) => {
    Logger.debug(message, meta);
  },

  // Logs específicos da aplicação
  auth: {
    login: (userId: string, email: string) => {
      Logger.info('User logged in', { userId, email, action: 'LOGIN' });
    },
    
    logout: (userId: string) => {
      Logger.info('User logged out', { userId, action: 'LOGOUT' });
    },
    
    register: (userId: string, email: string) => {
      Logger.info('User registered', { userId, email, action: 'REGISTER' });
    },
    
    failed: (email: string, reason: string) => {
      Logger.warn('Authentication failed', { email, reason, action: 'AUTH_FAILED' });
    },
  },

  payment: {
    initiated: (userId: string, amount: number) => {
      Logger.info('Payment initiated', { userId, amount, action: 'PAYMENT_INIT' });
    },
    
    completed: (userId: string, paymentId: string, amount: number) => {
      Logger.info('Payment completed', { userId, paymentId, amount, action: 'PAYMENT_SUCCESS' });
    },
    
    failed: (userId: string, reason: string) => {
      Logger.error('Payment failed', { userId, reason, action: 'PAYMENT_FAILED' });
    },
  },

  api: {
    request: (method: string, url: string, userId?: string) => {
      Logger.http('API Request', { method, url, userId });
    },
    
    response: (method: string, url: string, statusCode: number, duration: number) => {
      Logger.http('API Response', { method, url, statusCode, duration });
    },
    
    error: (method: string, url: string, error: string) => {
      Logger.error('API Error', { method, url, error });
    },
  },

  performance: {
    slow: (operation: string, duration: number, threshold: number) => {
      Logger.warn('Slow operation detected', { operation, duration, threshold });
    },
    
    metric: (name: string, value: number, unit: string) => {
      Logger.info('Performance metric', { metric: name, value, unit });
    },
  },
};

export default logger;