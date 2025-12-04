// app/api/health/route.ts
// Endpoint para verificar saúde da aplicação

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { client as sanityClient } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks: Record<string, any> = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    checks: {},
  };

  // 1. Verificar conexão com Supabase
  try {
    const { error } = await supabase.from('usuarios').select('count').limit(1);
    checks.checks.database = {
      status: error ? 'unhealthy' : 'healthy',
      message: error ? error.message : 'Connected',
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    checks.checks.database = {
      status: 'unhealthy',
      message: error.message,
      timestamp: new Date().toISOString(),
    };
    checks.status = 'unhealthy';
  }

  // 2. Verificar Sanity
  try {
    await sanityClient.fetch('*[_type == "aula"][0]');
    checks.checks.cms = {
      status: 'healthy',
      message: 'Connected',
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    checks.checks.cms = {
      status: 'unhealthy',
      message: error.message,
      timestamp: new Date().toISOString(),
    };
    checks.status = 'unhealthy';
  }

  // 3. Verificar variáveis de ambiente críticas
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'MP_ACCESS_TOKEN',
  ];

  const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
  
  checks.checks.environment = {
    status: missingEnvVars.length === 0 ? 'healthy' : 'unhealthy',
    message: missingEnvVars.length === 0 
      ? 'All required variables present' 
      : `Missing: ${missingEnvVars.join(', ')}`,
    timestamp: new Date().toISOString(),
  };

  if (missingEnvVars.length > 0) {
    checks.status = 'unhealthy';
  }

  // 4. Informações do sistema
  checks.system = {
    nodeVersion: process.version,
    platform: process.platform,
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB',
    },
  };

  const statusCode = checks.status === 'healthy' ? 200 : 503;

  return NextResponse.json(checks, { status: statusCode });
}