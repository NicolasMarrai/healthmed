import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Configuração do Mercado Pago
const mpClient = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || ''
});

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Verifica se é uma notificação de pagamento
    if (data.type !== 'payment' || !data.data || !data.data.id) {
        return NextResponse.json({ success: true, message: 'Notificacao ignorada' }, { status: 200 });
    }

    const paymentId = data.data.id;

    // 2. BUSCAR OS DETALHES DO PAGAMENTO
    const payment = new Payment(mpClient);
    const paymentData = await payment.get({ id: paymentId });

    const status = paymentData.status; 
    const userId = paymentData.external_reference; 

    // 3. VERIFICAR SE FOI APROVADO
    if (status === 'approved' && userId) {
      
      console.log(`[WEBHOOK]: Pagamento ${paymentId} APROVADO para o user ${userId}.`);

      // 4. ATUALIZAR O STATUS NO SUPABASE
      const { error: rpcError } = await supabase.rpc('update_user_status', {
        p_user_id: userId,
        p_new_status: 'ACTIVE' 
      });

      if (rpcError) {
        console.error(`[WEBHOOK]: Erro ao atualizar status do user ${userId}:`, rpcError);
        return NextResponse.json({ error: 'Erro interno ao atualizar DB' }, { status: 500 });
      }

      // 5. REGISTRO DE PAGAMENTO 
      await supabase.from('pagamentos').insert([
        { 
          user_id: userId, 
          mp_payment_id: paymentId,
          valor: paymentData.transaction_amount,
          status: status
        }
      ]);
      
    } else {
        console.log(`[WEBHOOK]: Pagamento ${paymentId} com status: ${status}. Nao liberado.`);
    }

    // Retorno de sucesso (200 OK)
    return NextResponse.json({ success: true, message: 'Webhook processado' }, { status: 200 });

  } catch (error) {
    console.error('[WEBHOOK ERROR GERAL]:', error);
    return NextResponse.json({ error: 'Erro de processamento' }, { status: 500 });
  }
}