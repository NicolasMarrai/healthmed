// instrumentation.ts
// Este arquivo é executado quando o Next.js inicia (server-side)

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Importar configuração do Sentry para servidor
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Importar configuração do Sentry para edge
    await import('./sentry.edge.config');
  }
}