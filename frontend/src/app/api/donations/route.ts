import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Donation from "@/models/donation";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { name, email, amount, paymentMethod, campaignId } = await req.json();

    if (!name || !email || !amount || !paymentMethod || !campaignId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const donation = await Donation.create({
      name,
      email,
      amount,
      paymentMethod,
      campaign: campaignId,
    });

    return NextResponse.json({ success: true, donation }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
