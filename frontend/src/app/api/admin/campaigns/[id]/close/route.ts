import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Campaign from "@/models/campaign";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const campaign = await Campaign.findByIdAndUpdate(
    params.id,
    { status: "closed" },
    { new: true }
  );
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(campaign);
}
