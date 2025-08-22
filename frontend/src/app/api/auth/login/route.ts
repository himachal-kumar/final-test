import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";

// Helper function to safely compare passwords
async function safeCompare(plainPassword: string, hashedPassword: string | undefined) {
  if (!hashedPassword) return false;
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Password comparison error:", error);
    return false;
  }
}

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();

  try {
    // Use select('+password') to include the password field which is set to select: false in the schema
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Use the safe compare function
    const isMatch = await safeCompare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // set HTTP-only cookie
    const res = NextResponse.json({ message: "Login successful", user });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
