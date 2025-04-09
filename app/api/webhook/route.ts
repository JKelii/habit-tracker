/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/app/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature || "",
      webhookSecret
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (e: any) {
    console.error(`stripe error: ${e.message} | EVENT TYPE: ${event.type}`);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

  return NextResponse.json({});
}

const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session
) => {
  const userId = session.metadata?.clerkUserId;
  console.log("Handling checkout.session.completed for user:", userId);

  if (!userId) {
    console.error("No userId found in session metadata.");
    return;
  }

  const subscriptionId = session.subscription as string;

  if (!subscriptionId) {
    console.error("No subscription ID found in session.");
    return;
  }

  try {
    await prisma.user.update({
      where: { userId },
      data: {
        stripeSubscriptionId: subscriptionId,
        subscriptionActive: true,
        subscriptionTier: session.metadata?.planType || null,
      },
    });
    console.log(`Subscription activated for user: ${userId}`);
  } catch (error: any) {
    console.error("Prisma Update Error:", error.message);
  }
};

const handleInvoicePaymentFailed = async (invoice: Stripe.Invoice) => {
  const subscriptionId = invoice.subscription as string;
  console.log(
    "Handling invoice.payment_failed for subscription:",
    subscriptionId
  );

  if (!subscriptionId) {
    console.error("No subscription ID found in invoice.");
    return;
  }

  let userId: string | undefined;
  try {
    const profile = await prisma.user.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      select: { userId: true },
    });

    if (!profile?.userId) {
      console.error("No profile found for this subscription ID.");
      return;
    }

    userId = profile.userId;
  } catch (error: any) {
    console.error("Prisma Query Error:", error.message);
    return;
  }

  try {
    await prisma.user.update({
      where: { userId },
      data: {
        subscriptionActive: false,
      },
    });
    console.log(`Subscription payment failed for user: ${userId}`);
  } catch (error: any) {
    console.error("Prisma Update Error:", error.message);
  }
};

const handleSubscriptionDeleted = async (subscription: Stripe.Subscription) => {
  const subscriptionId = subscription.id;
  console.log(
    "Handling customer.subscription.deleted for subscription:",
    subscriptionId
  );

  let userId: string | undefined;
  try {
    const profile = await prisma.user.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      select: { userId: true },
    });

    if (!profile?.userId) {
      console.error("No profile found for this subscription ID.");
      return;
    }

    userId = profile.userId;
  } catch (error: any) {
    console.error("Prisma Query Error:", error.message);
    return;
  }

  try {
    await prisma.user.update({
      where: { userId },
      data: {
        subscriptionActive: false,
        stripeSubscriptionId: null,
      },
    });
    console.log(`Subscription canceled for user: ${userId}`);
  } catch (error: any) {
    console.error("Prisma Update Error:", error.message);
  }
};
