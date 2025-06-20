import connectDB from "@/db/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    // Optional: Check for OTP expiry (e.g., 10 minutes)
    const otpAge = Date.now() - new Date(user.otpCreatedAt).getTime();
    if (otpAge > 10 * 60 * 1000) {
      return NextResponse.json({ error: "OTP expired" }, { status: 410 });
    }

    // Mark user as verified
    user.isverified = true;
    user.otp = undefined;
    user.otpCreatedAt = undefined;
    await user.save();

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
