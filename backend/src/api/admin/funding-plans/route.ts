import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FundingPlan from "@/models/funding_plans";
import Campaign from "@/models/campaign";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { campaign_id, title, amount_cents, interval, ps_provider_plan_id } = await req.json();

    // Validate required fields
    if (!campaign_id || !title || !amount_cents || !interval || !ps_provider_plan_id) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Ensure campaign exists
    const campaign = await Campaign.findById(campaign_id);
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    // Create funding plan
    const plan = new FundingPlan({
      campaign_id,
      title,
      amount_cents,
      interval,
      ps_provider_plan_id,
    });

    await plan.save();

    return NextResponse.json(plan, { status: 201 });
  } catch (err) {
    console.error("Error creating funding plan:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
