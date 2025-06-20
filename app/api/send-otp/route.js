import connectDB from "@/db/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req) => {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 1. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Save OTP and timestamp in user document
    user.otp = otp;
    user.otpCreatedAt = new Date();
    await user.save();

    // 3. Send Email with OTP using nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use SMTP settings
      auth: {
        user: process.env.NEXT_PUBLIC_USER_EMAIL,
        pass: process.env.NEXT_PUBLIC_USER_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_USER_EMAIL_PASS,
      to: email,
      subject: "Your OTP for Login",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
