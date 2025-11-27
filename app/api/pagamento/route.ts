import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN! 
});

export async function POST(req: Request) {
  try {
    const { userId, email } = await req.json();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
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

        notification_url: 'https://unperished-catrina-shakenly.ngrok-free.dev/api/mp-webhook',

        back_urls: {
          success: `${siteUrl}/dashboard`,
          failure: `${siteUrl}/pagamento-inicial`,
          pending: `${siteUrl}/pagamento-inicial`,
        },
        payment_methods: {
          excluded_payment_types: [],
          excluded_payment_methods: [],
          installments: 12,
          default_installments: 1
        },
      }
    });

    return NextResponse.json({ url: result.init_point });
    
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
  }
}