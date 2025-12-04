// sentry.server.config.ts
// Configuração do Sentry para capturar erros no SERVIDOR

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  tracesSampleRate: 1.0,
  
  environment: process.env.NODE_ENV,
  
  // Capturar informações de requisições HTTP
  integrations: [
    Sentry.httpIntegration(),
  ],
  
  beforeSend(event) {
    // Remover informações sensíveis
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }
    return event;
  },
});