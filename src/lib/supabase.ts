// src/lib/supabase.ts
// Inicializa o cliente Supabase para comunicação com o banco de dados.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificação de segurança (TypeScript)
if (!supabaseUrl || !supabaseKey) {
  // Isso irá parar o servidor se as chaves estiverem faltando no .env.local
  throw new Error("Chaves do Supabase faltando nas variáveis de ambiente (.env.local).");
}

// Cria e exporta o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);