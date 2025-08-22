import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";
import { cookies } from "next/headers";

export async function GET() {
  await dbConnect();

  try {
    // Get token from cookies using Next.js headers
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    // Find user without password
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error("Auth error:", error.message);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
