import { NextResponse } from 'next/server';
import { supabase } from '@src/lib/supabase';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { 
  ValidationError, 
  PaymentError, 
  createErrorResponse, 
  withErrorHandling 
} from '../../../lib/errors';
import { logger } from '../../../lib/logger.server'; // ⬅️ ADICIONAR
import PerformanceMonitor from '../../../lib/performance'; // ⬅️ ADICIONAR

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN! 
});

async function handleWebhook(req: Request) {
  logger.info("🔔 [WEBHOOK] Recebendo notificação do Mercado Pago"); // ⬅️ MUDAR

  // Validar Content-Type
  const contentType = req.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    logger.warn('[WEBHOOK] Content-Type inválido', { contentType }); // ⬅️ ADICIONAR
    throw new ValidationError('Content-Type deve ser application/json');
  }

  let data;
  try {
    data = await req.json();
  } catch (error) {
    logger.error('[WEBHOOK] JSON inválido', { error }); // ⬅️ ADICIONAR
    throw new ValidationError('JSON inválido no body da requisição');
  }
  
  // Verifica se é uma notificação de pagamento válida
  if (data.type !== 'payment') {
    logger.info(`[WEBHOOK] Tipo de notificação ignorada: ${data.type}`); // ⬅️ OK
    return NextResponse.json({ 
      success: true, 
      message: 'Notificação processada (ignorada)' 
    }, { status: 200 });
  }

  if (!data.data?.id) {
    logger.warn('[WEBHOOK] ID do pagamento não encontrado'); // ⬅️ ADICIONAR
    throw new ValidationError('ID do pagamento não encontrado na notificação');
  }

  const paymentId = data.data.id;
  logger.info(`[WEBHOOK] Processando pagamento ID: ${paymentId}`); // ⬅️ OK
  
  // Medir performance da operação ⬅️ ADICIONAR
  PerformanceMonitor.start(`webhook-${paymentId}`);

  // Busca detalhes do pagamento no Mercado Pago
  let paymentData;
  try {
    const payment = new Payment(client);
    paymentData = await payment.get({ id: paymentId });
  } catch (error) {
    logger.error('[WEBHOOK] Erro ao buscar pagamento no MP', { error, paymentId }); // ⬅️ MUDAR
    throw new PaymentError(`Não foi possível obter dados do pagamento ${paymentId}`);
  }

  if (!paymentData) {
    logger.error('[WEBHOOK] Pagamento não encontrado', { paymentId }); // ⬅️ ADICIONAR
    throw new PaymentError(`Pagamento ${paymentId} não encontrado no Mercado Pago`);
  }

  logger.info(`[WEBHOOK] Status do pagamento: ${paymentData.status}`); // ⬅️ OK
  logger.info(`[WEBHOOK] External reference: ${paymentData.external_reference}`); // ⬅️ OK

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
        logger.error('[WEBHOOK] Erro ao atualizar usuário', { error: updateError, userId }); // ⬅️ MUDAR
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
        logger.error('[WEBHOOK] Erro ao registrar pagamento', { error: insertError, userId }); // ⬅️ MUDAR
      }

      // ⬅️ ADICIONAR LOGS DE SUCESSO
      logger.payment.completed(userId, paymentId.toString(), paymentData.transaction_amount || 0);
      logger.info(`[WEBHOOK] ✅ Usuário ${userId} ativado com sucesso!`);
      
    } catch (error) {
      logger.error('[WEBHOOK] Erro no processamento', { error, userId }); // ⬅️ MUDAR
      throw new PaymentError(`Erro ao processar pagamento aprovado: ${error}`);
    }
  }

  // ⬅️ ADICIONAR MEDIÇÃO DE PERFORMANCE
  const duration = PerformanceMonitor.end(`webhook-${paymentId}`);
  
  // ⬅️ ADICIONAR LOG DE SUCESSO
  logger.info('[WEBHOOK] Webhook processado com sucesso', {
    paymentId,
    status: paymentData.status,
    duration: `${duration}ms`
  });

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
    logger.error('[WEBHOOK] Erro ao processar webhook', { error }); // ⬅️ ADICIONAR
    return createErrorResponse(error);
  }
});