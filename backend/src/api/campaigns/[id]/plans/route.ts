import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FundingPlan from "@/models/funding_plans";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const data = await req.json();
  const plan = await FundingPlan.create({ ...data, campaign_id: params.id });
  return NextResponse.json(plan);
}
