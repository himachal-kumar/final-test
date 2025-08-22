import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/subscriptions";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const sub = await Subscription.findByIdAndUpdate(params.id, { status: "canceled" }, { new: true });
  if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(sub);
}
