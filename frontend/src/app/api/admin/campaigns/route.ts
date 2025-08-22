import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Campaign from "@/models/campaign";

export async function GET() {
  await dbConnect();
  const campaigns = await Campaign.find({});
  return NextResponse.json(campaigns);
}
