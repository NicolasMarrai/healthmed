// app/api/health/live/route.ts
// Verifica se a aplicação está "viva" (liveness probe)

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ 
    status: 'alive',
    timestamp: new Date().toISOString() 
  }, { 
    status: 200 
  });
}