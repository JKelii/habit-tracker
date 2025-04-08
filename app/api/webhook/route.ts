import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/app/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.arrayBuffer();
  const signature = request.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  console.log("Stripe signature:", signature);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(body),
      signature || "",
      webhookSecret
    );
    console.log("Event successfully constructed:", event.type);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error constructing event:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    console.log("Received event:", event.type);
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout session completed:", session);
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Invoice payment failed:", invoice);
        await handleInvoicePaymentFailed(invoice);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Customer subscription deleted:", subscription);
        await handleCustomerSubscriptionDeleted(subscription);
        break;
      }
      default:
        console.log("Unhandled event type", event.type);
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error processing event:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  return NextResponse.json({});
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.clerkUserId;
  const planType = session.metadata?.planType;

  console.log("Handling checkout session completion:", { userId, planType });

  if (!userId) {
    console.log("No user id in session");
    return;
  }

  const subscriptionId = session.subscription as string;
  if (!subscriptionId) {
    console.log("No subscription id in session");
    return;
  }

  try {
    console.log(`Updating user ${userId} subscription in the database`);
    await prisma.user.update({
      where: { userId },
      data: {
        stripeSubscriptionId: subscriptionId,
        subscriptionActive: true,
        subscriptionTier: planType || null,
      },
    });
    console.log(`User ${userId} subscription updated`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error updating user subscription:", err.message);
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subID = invoice.subscription as string;

  if (!subID) {
    console.log("No subscription ID in invoice");
    return;
  }

  let userID: string | undefined;
  try {
    console.log(`Looking up user with subscription ID: ${subID}`);
    const user = await prisma.user.findUnique({
      where: { stripeSubscriptionId: subID },
      select: { userId: true },
    });

    if (!user?.userId) {
      console.log("No profile found for subscription ID:", subID);
      return;
    }

    userID = user.userId;
    console.log("User found, userID:", userID);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error finding user by subscription ID:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    console.log(`Deactivating subscription for user ${userID}`);
    await prisma.user.update({
      where: { userId: userID },
      data: { subscriptionActive: false },
    });
    console.log(`User ${userID} subscription deactivated`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error deactivating user subscription:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

async function handleCustomerSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  const subID = subscription.id;

  console.log("Handling subscription deletion:", subID);

  let userID: string | undefined;
  try {
    console.log(`Looking up user with subscription ID: ${subID}`);
    const user = await prisma.user.findUnique({
      where: { stripeSubscriptionId: subID },
      select: { userId: true },
    });

    if (!user?.userId) {
      console.log("No profile found for subscription ID:", subID);
      return;
    }

    userID = user.userId;
    console.log("User found, userID:", userID);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error finding user by subscription ID:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    console.log(`Deactivating subscription for user ${userID}`);
    await prisma.user.update({
      where: { userId: userID },
      data: {
        subscriptionActive: false,
        stripeSubscriptionId: null,
        subscriptionTier: null,
      },
    });
    console.log(`User ${userID} subscription deleted`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error deleting user subscription:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
