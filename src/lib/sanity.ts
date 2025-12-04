// lib/sanity.ts
import { createClient } from 'next-sanity';

// Cliente para uso no browser (usa variáveis públicas)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Cliente para uso no servidor (usa variáveis de ambiente server-only quando disponíveis)
export const serverClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN || undefined,
});

// Validações para ajudar no debug local
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !process.env.SANITY_PROJECT_ID) {
  console.error('❌ SANITY_PROJECT_ID não configurado. Defina NEXT_PUBLIC_SANITY_PROJECT_ID (client) ou SANITY_PROJECT_ID (server) no .env.local');
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET && !process.env.SANITY_DATASET) {
  console.warn('⚠️ SANITY_DATASET não configurado, usando "production" como dataset padrão');
}