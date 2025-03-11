import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prisma from "@/app/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature || "",
      webhookSecret
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case "invoice.payment_failed": {
        const session = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(session);
        break;
      }
      case "customer.subscription.deleted": {
        const session = event.data.object as Stripe.Subscription;
        await handleCustomerSubscriptionDeleted(session);
        break;
      }
      default:
        console.log("Unhandled event type" + event.type);
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
  return NextResponse.json({});
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.clerkUserId;
  const planType = session.metadata?.planType;

  if (!userId) {
    console.log("No user id");
    return;
  }
  const subscriptionId = session.subscription as string;
  if (!subscriptionId) {
    console.log("No user id");
    return;
  }

  try {
    await prisma.user.update({
      where: { userId },
      data: {
        stripeSubscriptionId: subscriptionId,
        subscriptionActive: true,
        subscriptionTier: planType || null,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subID = invoice.subscription as string;

  if (!subID) {
    return;
  }

  let userID: string | undefined;
  try {
    const user = await prisma.user.findUnique({
      where: { stripeSubscriptionId: subID },
      select: { userId: true },
    });

    if (!user?.userId) {
      console.log("No profile found");
      return;
    }

    userID = user.userId;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: { userId: userID },
      data: { subscriptionActive: false },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

async function handleCustomerSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  const subID = subscription.id;

  let userID: string | undefined;
  try {
    const user = await prisma.user.findUnique({
      where: { stripeSubscriptionId: subID },
      select: { userId: true },
    });

    if (!user?.userId) {
      console.log("No profile found");
      return;
    }

    userID = user.userId;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: { userId: userID },
      data: {
        subscriptionActive: false,
        stripeSubscriptionId: null,
        subscriptionTier: null,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
