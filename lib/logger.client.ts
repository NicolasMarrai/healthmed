// lib/logger.client.ts
// Logger simplificado para uso no cliente (navegador)

const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  // Logs básicos
  error: (message: string, meta?: any) => {
    console.error(`[ERROR] ${message}`, meta || '');
  },
  
  warn: (message: string, meta?: any) => {
    console.warn(`[WARN] ${message}`, meta || '');
  },
  
  info: (message: string, meta?: any) => {
    if (isDev) {
      console.log(`[INFO] ${message}`, meta || '');
    }
  },
  
  http: (message: string, meta?: any) => {
    if (isDev) {
      console.log(`[HTTP] ${message}`, meta || '');
    }
  },
  
  debug: (message: string, meta?: any) => {
    if (isDev) {
      console.debug(`[DEBUG] ${message}`, meta || '');
    }
  },

  // Logs específicos da aplicação
  auth: {
    login: (userId: string, email: string) => {
      console.log('[AUTH] User logged in', { userId, email });
    },
    
    logout: (userId: string) => {
      console.log('[AUTH] User logged out', { userId });
    },
    
    register: (userId: string, email: string) => {
      console.log('[AUTH] User registered', { userId, email });
    },
    
    failed: (email: string, reason: string) => {
      console.warn('[AUTH] Authentication failed', { email, reason });
    },
  },

  payment: {
    initiated: (userId: string, amount: number) => {
      console.log('[PAYMENT] Payment initiated', { userId, amount });
    },
    
    completed: (userId: string, paymentId: string, amount: number) => {
      console.log('[PAYMENT] Payment completed', { userId, paymentId, amount });
    },
    
    failed: (userId: string, reason: string) => {
      console.error('[PAYMENT] Payment failed', { userId, reason });
    },
  },

  performance: {
    slow: (operation: string, duration: number, threshold: number) => {
      console.warn('[PERFORMANCE] Slow operation', { operation, duration, threshold });
    },
    
    metric: (name: string, value: number, unit: string) => {
      if (isDev) {
        console.log('[PERFORMANCE]', { metric: name, value, unit });
      }
    },
  },
};

export default logger;