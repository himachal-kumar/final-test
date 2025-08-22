import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Payment from "@/models/payments";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  // TODO: verify signature from PSP
  const payment = await Payment.create({
    user_id: body.userId,
    campaign_id: body.campaignId,
    subscription_id: body.subscriptionId,
    amount_cents: body.amount,
    currency: body.currency,
    status: body.status,
    provider_payload: body,
  });

  return NextResponse.json({ received: true, payment });
}
