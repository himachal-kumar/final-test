import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Campaign from "@/models/campaign";

export async function GET() {
  await dbConnect();
  const campaigns = await Campaign.find({});
  const totalRaised = campaigns.reduce((sum, c) => sum + (c.collected_amount || 0), 0);

  return NextResponse.json({
    totalRaised,
    campaigns: campaigns.map(c => ({
      id: c._id,
      title: c.title,
      collected: c.collected_amount,
      goal: c.goal_amount,
    }))
  });
}
