import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { 
  ValidationError, 
  PaymentError, 
  createErrorResponse, 
  withErrorHandling 
} from '../../../lib/errors';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN! 
});

async function handleCreatePayment(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    throw new ValidationError('JSON inválido no body da requisição');
  }

  const { userId, email } = body;

  // Validações
  if (!userId) {
    throw new ValidationError('Campo userId é obrigatório');
  }
  if (!email) {
    throw new ValidationError('Campo email é obrigatório');
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [{
          id: 'healthmed-premium',
          title: 'Assinatura HealthMed Premium',
          quantity: 1,
          unit_price: 0.50,
          currency_id: 'BRL',
        }],
        payer: { email },
        external_reference: userId,

        notification_url: process.env.MP_WEBHOOK_URL || 'https://unperished-catrina-shakenly.ngrok-free.dev/api/mp-webhook',

        back_urls: {
          success: `${siteUrl}/dashboard`,
          failure: `${siteUrl}/pagamento-inicial?error=payment_failed`,
          pending: `${siteUrl}/pagamento-inicial?status=pending`,
        },
        auto_return: 'approved',
      },
    });

    if (!result.init_point) {
      throw new PaymentError('Falha ao gerar link de pagamento');
    }

    return NextResponse.json({
      success: true,
      data: {
        init_point: result.init_point,
        preference_id: result.id,
      },
      message: 'Preferência de pagamento criada com sucesso'
    });

  } catch (error: any) {
    console.error('Erro ao criar preferência MP:', error);
    throw new PaymentError(`Erro no Mercado Pago: ${error.message || 'Erro desconhecido'}`);
  }
}

export const POST = withErrorHandling(async (req: Request) => {
  try {
    return await handleCreatePayment(req);
  } catch (error: any) {
    return createErrorResponse(error);
  }
});