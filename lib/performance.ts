// lib/performance.ts
// Monitoramento de performance da aplicação

import { analytics } from './analytics';

// Logger simplificado que funciona em qualquer lugar
const simpleLogger = {
  warn: (msg: string, data?: any) => console.warn(msg, data || ''),
  info: (msg: string, data?: any) => console.log(msg, data || ''),
  performance: {
    slow: (op: string, dur: number, thresh: number) => {
      console.warn('[PERFORMANCE] Slow operation', { operation: op, duration: dur, threshold: thresh });
    },
    metric: (name: string, value: number, unit: string) => {
      console.log('[PERFORMANCE]', { metric: name, value, unit });
    }
  }
};

export class PerformanceMonitor {
  private static timers: Map<string, number> = new Map();

  static start(label: string) {
    this.timers.set(label, performance.now());
  }

  static end(label: string) {
    const startTime = this.timers.get(label);
    if (!startTime) {
      simpleLogger.warn(`Performance timer "${label}" não foi iniciado`);
      return;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(label);

    const threshold = 1000;
    if (duration > threshold) {
      simpleLogger.performance.slow(label, duration, threshold);
    }

    simpleLogger.performance.metric(label, duration, 'ms');
    return duration;
  }

  static async measure<T>(
    label: string,
    fn: () => Promise<T>
  ): Promise<T> {
    this.start(label);
    try {
      const result = await fn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }

  static reportWebVitals(metric: any) {
    const { name, value, id } = metric;
    
    simpleLogger.performance.metric(name, value, 'ms');

    if (typeof window !== 'undefined') {
      try {
        analytics.track('Web Vitals', {
          metric: name,
          value: Math.round(name === 'CLS' ? value * 1000 : value),
          id: id,
        });
      } catch (error) {
        console.debug('Analytics não disponível para Web Vitals');
      }
    }
  }
}

export function usePerformance(label: string) {
  if (typeof window === 'undefined') return { start: () => {}, end: () => {} };

  const start = () => PerformanceMonitor.start(label);
  const end = () => PerformanceMonitor.end(label);

  return { start, end };
}

export default PerformanceMonitor;
