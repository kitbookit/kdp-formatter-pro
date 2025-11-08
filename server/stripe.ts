import Stripe from "stripe";
import { ENV } from "./_core/env";

// Initialize Stripe with the secret key
const stripe = new Stripe(ENV.stripeSecretKey || "");

// Ensure Stripe is properly initialized
if (!ENV.stripeSecretKey) {
  console.warn("Warning: Stripe is not configured. Payments will not work.");
}

export interface CreateCheckoutSessionParams {
  userId: number;
  projectId?: number;
  amount: number;
  currency: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
}

/**
 * Create a Stripe checkout session for a payment
 */
export async function createCheckoutSession(params: CreateCheckoutSessionParams) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: params.currency.toLowerCase(),
            product_data: {
              name: params.description,
              description: `Progetto ID: ${params.projectId || "N/A"}`,
            },
            unit_amount: params.amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: {
        userId: params.userId.toString(),
        projectId: params.projectId?.toString() || "null",
      },
    });

    return session;
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    throw error;
  }
}

/**
 * Retrieve a checkout session by ID
 */
export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error("Error retrieving Stripe checkout session:", error);
    throw error;
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  webhookSecret: string
): Stripe.Event | null {
  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    return event;
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return null;
  }
}

/**
 * Handle payment success webhook
 */
export async function handlePaymentSuccess(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId ? parseInt(session.metadata.userId) : null;
  const projectId = session.metadata?.projectId
    ? parseInt(session.metadata.projectId)
    : null;

  if (!userId) {
    console.error("Missing userId in session metadata");
    return;
  }

  return {
    userId,
    projectId,
    sessionId: session.id,
    paymentStatus: session.payment_status,
    amount: session.amount_total,
    currency: session.currency,
  };
}

export default stripe;

