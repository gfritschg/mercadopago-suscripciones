import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, back_url }: { email: string; back_url: string } = await req.json();

    const response = await fetch('https://api.mercadopago.com/preapproval', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        reason: 'Suscripción mensual',
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: 10000,
          currency_id: 'CLP',
          start_date: new Date().toISOString(),
          end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
        },
        back_url,
        payer_email: email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al crear la suscripción:', errorData);
      return NextResponse.json({ error: 'No se pudo crear la suscripción' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ init_point: data.init_point }, { status: 200 });
  } catch (err) {
    console.error('Error al procesar la solicitud:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
