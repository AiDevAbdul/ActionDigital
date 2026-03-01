// src/app/api/payments/stripe/intent/route.ts
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    return Response.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: '2026-02-25.clover' });

  const { userId, amountCents, currency, courseId } = await request.json();
  if (!userId || !amountCents || !currency) {
    return Response.json({ error: 'Missing payment intent data' }, { status: 400 });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency,
      metadata: {
        userId,
        courseId: courseId ?? '',
      },
    });
    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe payment intent error', error);
    return Response.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
