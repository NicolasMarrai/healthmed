import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN! 
});

export async function POST(req: Request) {

    console.log("🔔 [WEBHOOK] Recebendo notificação...");

  try {
    const data = await req.json();
    
    // Verifica se é uma notificação de pagamento
    if (data.type !== 'payment' || !data.data?.id) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const paymentId = data.data.id;
    
    // Busca detalhes do pagamento
    const payment = new Payment(client);
    const paymentData = await payment.get({ id: paymentId });

    // Se pagamento aprovado, ativa o usuário
    if (paymentData.status === 'approved' && paymentData.external_reference) {
      const userId = paymentData.external_reference;

      // Atualiza status do usuário
      await supabase.rpc('update_user_status', {
        p_user_id: userId,
        p_new_status: 'ACTIVE'
      });

      // Registra pagamento
      await supabase.from('pagamentos').insert({
        user_id: userId,
        mp_payment_id: paymentId.toString(),
        valor: paymentData.transaction_amount,
        status: paymentData.status
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error) {
    console.error('[WEBHOOK ERROR]:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}