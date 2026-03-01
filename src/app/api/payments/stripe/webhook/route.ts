// src/app/api/payments/stripe/webhook/route.ts
import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecret || !webhookSecret) {
    return Response.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: '2026-02-25.clover' });

  const signature = request.headers.get('stripe-signature');
  const payload = await request.text();
  if (!signature) {
    return Response.json({ error: 'Missing signature' }, { status: 400 });
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature mismatch', err);
    return Response.json({ error: 'Signature mismatch' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as Stripe.PaymentIntent;
    const userId = intent.metadata.userId;
    const courseId = intent.metadata.courseId || null;
    await db.payment.create({
      data: {
        userId,
        courseId,
        amountCents: intent.amount ?? 0,
        currency: (intent.currency || 'usd').toUpperCase(),
        provider: 'STRIPE',
        providerRef: intent.id,
      },
    });
  }

  return Response.json({ received: true });
}
