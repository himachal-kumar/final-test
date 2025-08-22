import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: Request) {
  await dbConnect();
  const { name, email, password } = await req.json();
  console.log(name,email,password)

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  return NextResponse.json({ id: user._id, email: user.email });
}
