// lib/sanity.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Validação para ajudar no debug
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('❌ SANITY_PROJECT_ID não configurado no .env.local');
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.warn('⚠️ SANITY_DATASET não configurado, usando "production"');
}