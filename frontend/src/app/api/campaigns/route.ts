import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Campaign from "@/models/campaign";

export async function GET() {
  await connectDB();
  const campaigns = await Campaign.find({});
  return NextResponse.json(campaigns);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const campaign = await Campaign.create(data);
  return NextResponse.json(campaign);
}
