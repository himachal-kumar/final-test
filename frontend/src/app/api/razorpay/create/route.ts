import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/order.js";
import User from "@/models/user";

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string
});

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const { totalAmount, userId, campaignId, fundingPlanId } = body;

    if (!userId) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 });
    }

    if (!campaignId) {
      return NextResponse.json({ message: "Campaign ID is required" }, { status: 400 });
    }

    if (!fundingPlanId) {
      return NextResponse.json({ message: "Funding Plan ID is required" }, { status: 400 });
    }

    const totalAmountInt = parseInt(totalAmount);
    if (!totalAmountInt || totalAmountInt <= 0) {
      return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
    }

    // Create order in Razorpay
    const options = {
      amount: totalAmountInt * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Create pending order in DB
    const newOrder = new Order({
      user: userId,
      campaign: campaignId,
      fundingPlan: fundingPlanId,
      amount: totalAmountInt,
      status: "pending",
    });

    await newOrder.save();

    // Link order to user
    await User.findByIdAndUpdate(userId, {
      $push: { orders: newOrder._id },
    });

    // Response: Razorpay order + our DB orderId
    return NextResponse.json({
      success: true,
      razorpayOrder: order,
      orderId: newOrder._id,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { message: error.error?.description || "Error creating payment order" },
      { status: 500 }
    );
  }
}
