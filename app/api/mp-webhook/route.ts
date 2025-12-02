import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { 
  ValidationError, 
  PaymentError, 
  createErrorResponse, 
  withErrorHandling 
} from '../../../lib/errors';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN! 
});

async function handleWebhook(req: Request) {
  console.log("🔔 [WEBHOOK] Recebendo notificação...");

  // Validar Content-Type
  const contentType = req.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    throw new ValidationError('Content-Type deve ser application/json');
  }

  let data;
  try {
    data = await req.json();
  } catch (error) {
    throw new ValidationError('JSON inválido no body da requisição');
  }
  
  // Verifica se é uma notificação de pagamento válida
  if (data.type !== 'payment') {
    console.log(`[WEBHOOK] Tipo de notificação ignorada: ${data.type}`);
    return NextResponse.json({ 
      success: true, 
      message: 'Notificação processada (ignorada)' 
    }, { status: 200 });
  }

  if (!data.data?.id) {
    throw new ValidationError('ID do pagamento não encontrado na notificação');
  }

  const paymentId = data.data.id;
  console.log(`[WEBHOOK] Processando pagamento ID: ${paymentId}`);
  
  // Busca detalhes do pagamento no Mercado Pago
  let paymentData;
  try {
    const payment = new Payment(client);
    paymentData = await payment.get({ id: paymentId });
  } catch (error) {
    console.error('[WEBHOOK] Erro ao buscar pagamento no MP:', error);
    throw new PaymentError(`Não foi possível obter dados do pagamento ${paymentId}`);
  }

  if (!paymentData) {
    throw new PaymentError(`Pagamento ${paymentId} não encontrado no Mercado Pago`);
  }

  console.log(`[WEBHOOK] Status do pagamento: ${paymentData.status}`);
  console.log(`[WEBHOOK] External reference: ${paymentData.external_reference}`);

  // Se pagamento aprovado, ativa o usuário
  if (paymentData.status === 'approved' && paymentData.external_reference) {
    const userId = paymentData.external_reference;

    try {
      // Atualiza status do usuário
      const { error: updateError } = await supabase.rpc('update_user_status', {
        p_user_id: userId,
        p_new_status: 'ACTIVE'
      });

      if (updateError) {
        console.error('[WEBHOOK] Erro ao atualizar usuário:', updateError);
        throw new PaymentError(`Erro ao ativar usuário ${userId}: ${updateError.message}`);
      }

      // Registra pagamento na tabela de pagamentos
      const { error: insertError } = await supabase.from('pagamentos').insert({
        user_id: userId,
        mp_payment_id: paymentId.toString(),
        valor: paymentData.transaction_amount,
        status: paymentData.status,
        created_at: new Date().toISOString()
      });

      if (insertError) {
        console.error('[WEBHOOK] Erro ao registrar pagamento:', insertError);
        // Não falhamos aqui pois o usuário já foi ativado
      }

      console.log(`[WEBHOOK] ✅ Usuário ${userId} ativado com sucesso!`);
      
    } catch (error) {
      console.error('[WEBHOOK] Erro no processamento:', error);
      throw new PaymentError(`Erro ao processar pagamento aprovado: ${error}`);
    }
  }

  return NextResponse.json({ 
    success: true,
    message: 'Webhook processado com sucesso',
    payment_id: paymentId,
    status: paymentData.status
  }, { status: 200 });
}

export const POST = withErrorHandling(async (req: Request) => {
  try {
    return await handleWebhook(req);
  } catch (error: any) {
    return createErrorResponse(error);
  }
});