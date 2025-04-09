import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/app/lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      console.error("No Stripe signature found in headers");
      return NextResponse.json(
        { error: "No Stripe signature found" },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("Webhook secret is not defined in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    console.log("Body length:", body.length);
    console.log("Signature length:", signature.length);
    console.log("Secret length:", webhookSecret.length);

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log("Event successfully constructed:", event.type);
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error constructing event:", err.message);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    try {
      console.log("Processing event:", event.type);
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

      return NextResponse.json({ received: true });
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error processing event:", err.message);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
  } catch (error) {
    console.error("Unexpected error in webhook handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
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
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        stripeSubscriptionId: subscriptionId,
        subscriptionActive: true,
        subscriptionTier: planType || null,
      },
    });
    console.log(`User ${userId} subscription updated`, updatedUser);
  } catch (error) {
    console.error("Error updating user subscription:", error);
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
