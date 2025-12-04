// sentry.client.config.ts
// Configuração do Sentry para capturar erros no CLIENTE (navegador)

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Rastreamento de performance
  tracesSampleRate: 1.0,
  
  // Capturar replay de sessões com erro
  replaysSessionSampleRate: 0.1, // 10% das sessões
  replaysOnErrorSampleRate: 1.0, // 100% quando há erro
  
  // Ambientes
  environment: process.env.NODE_ENV,
  
  // Ignorar erros conhecidos/irrelevantes
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    'Network request failed',
  ],
  
  // Configurações adicionais
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  
  // Contexto adicional
  beforeSend(event, hint) {
    // Adicionar informações extras ao erro
    if (event.exception) {
      console.error('[SENTRY ERROR CAPTURED]', hint.originalException);
    }
    return event;
  },
});