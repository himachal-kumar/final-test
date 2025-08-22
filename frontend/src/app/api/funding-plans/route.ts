// app/api/funding-plans/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FundingPlan from "@/models/funding_plans";

export async function GET() {
  try {
    await dbConnect();

    // populate campaign_id with title + ngo_name
    const plans = await FundingPlan.find().populate("campaign_id", "title ngo_name");

    return NextResponse.json(plans, { status: 200 });
  } catch (err) {
    console.error("Error fetching funding plans:", err);
    return NextResponse.json([], { status: 200 }); // return empty array instead of error
  }
}
