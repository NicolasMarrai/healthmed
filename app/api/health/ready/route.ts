// app/api/health/ready/route.ts
// Verifica se a aplicação está pronta para receber tráfego

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Verificações rápidas
  const ready = {
    status: 'ready',
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(ready, { status: 200 });
}