import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/subscriptions";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const subscription = await Subscription.create(data);
  return NextResponse.json(subscription);
}

export async function GET() {
  await dbConnect();
  const subs = await Subscription.find({});
  return NextResponse.json(subs);
}
