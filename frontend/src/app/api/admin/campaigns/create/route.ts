import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Campaign from "@/models/campaign";

export async function POST(req: Request) {
  try {
    await dbConnect(); // ensure MongoDB connection

    const { ngo_name, title, description, goal_amount } = await req.json();

    if (!ngo_name || !title || !goal_amount) {
      return NextResponse.json(
        { error: "NGO name, title, and goal amount are required" },
        { status: 400 }
      );
    }

    const campaign = new Campaign({
      ngo_name,
      title,
      description: description || "",
      goal_amount,
    });

    await campaign.save();

    return NextResponse.json(campaign, { status: 201 });
  } catch (err) {
    console.error("Error creating campaign:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
