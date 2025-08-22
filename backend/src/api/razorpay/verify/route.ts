// src/app/api/payment/verify/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/order";
import User from "@/models/user";
import Campaign from "@/models/campaign";

// Secret key from environment variables
const secret = process.env.RAZORPAY_KEY_SECRET as string;

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
      userId, // frontend should send this OR you fetch from JWT
    } = body;

    // 🔐 Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 🔑 Verify payment signature
    const signBody = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(signBody.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json({ message: "Invalid payment signature" }, { status: 400 });
    }

    // 🔎 Find order
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // 🔒 Verify ownership
    if (order.user.toString() !== userId.toString()) {
      return NextResponse.json({ message: "Not authorized to access this order" }, { status: 403 });
    }

    // ✅ Update order payment status
    order.status = "paid";
    order.paymentId = razorpay_payment_id;
    await order.save();

    // Update campaign collected amount
    const campaign = await Campaign.findById(order.campaign);
    if (campaign) {
      campaign.collected_amount += order.amount;
      await campaign.save();
    }

    // Optional: Notify admin via socket/email (skipping implementation here)
    // SocketService.notifyAdminPaymentCompleted(order);

    return NextResponse.json({
      message: "Payment verified successfully",
      order,
    });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { message: "Error verifying payment", error: error.message },
      { status: 500 }
    );
  }
}
