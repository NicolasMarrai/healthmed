import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configura o Mercado Pago com sua credencial
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN! 
});

export async function POST(req: Request) {
  try {
    const { userId, email } = await req.json();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Cria o objeto de preferência
    const preference = new Preference(client);

    // Cria a preferência de compra
    const result = await preference.create({
      body: {
        items: [
          {
            id: 'healthmed-premium',
            title: 'Assinatura HealthMed Premium',
            quantity: 1,
            unit_price: 1.00,
            currency_id: 'BRL',
          },
        ],
        payer: {
          email: email,
        },
        // IDENTIFICADOR IMPORTANTE:
        // Colocamos o ID do usuário aqui para saber QUEM pagou quando o webhook chegar
        external_reference: userId,
        
        // Para onde o usuário volta depois de pagar
        back_urls: {
          success: `${siteUrl}/dashboard`,
          failure: `${siteUrl}/pagamento-inicial`,
          pending: `${siteUrl}/pagamento-inicial`,
        },
        // Métodos de pagamento permitidos (incluindo PIX explicitamente)
        payment_methods: {
          excluded_payment_types: [], // Não excluir nenhum tipo
          excluded_payment_methods: [], // Não excluir nenhum método
          installments: 12, // Máximo de 12 parcelas para cartão
          default_installments: 1
        },
      }
    });

    // Retorna o link de pagamento (init_point)
    return NextResponse.json({ url: result.init_point });

  } catch (error) {
    console.error('Erro MP:', error);
    return NextResponse.json({ error: 'Erro ao criar preferência' }, { status: 500 });
  }
}