import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
  try {
    await connectDB(); // ensure MongoDB is connected
    const users = await User.find().sort({ name: 1 }); // sort alphabetically
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
