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
      subject: "Your Interview Ace OTP Code",
      text: `Hello!\n\nYour OTP for IterviewAce is: ${otp}\n\nThis code will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
            <h2 style="color: #007bff;"> Your Interview Ace OTP</h2>
            <p>Hello!</p>
            <p>Your OTP for accessing Interview Ace is:</p>
            <h1 style="letter-spacing: 5px; color: #333;">${otp}</h1>
            <p style="color: #888;">This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
            <p>If you didn’t request this, you can safely ignore this email.</p>
            <br>
            <p>Best regards,<br><strong>Interview Ace Team</strong></p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
