import { getPriceIDFromType } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const POST = async (request: NextRequest) => {
  try {
    const { planType, userID, email } = await request.json();

    console.log("Received planType:", planType);
    console.log("Received userID:", userID);
    console.log("Received email:", email);

    if (!planType || !userID || !email) {
      return NextResponse.json(
        { error: "Plan type, userID and email are required " },
        { status: 400 }
      );
    }

    const allowedPlanTypes = ["week", "year"];

    if (!allowedPlanTypes.includes(planType)) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    const priceID = getPriceIDFromType(planType);

    if (!priceID) {
      console.error("Invalid PriceID");
      return NextResponse.json({ error: "Invalid PriceID" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceID,
          quantity: 1,
        },
      ],
      customer_email: email,
      mode: "subscription",
      metadata: { clerkUserId: userID, planType: planType },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/premium`,
    });

    console.log("Stripe Session URL:", session.url);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error in /api/checkout:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
};
