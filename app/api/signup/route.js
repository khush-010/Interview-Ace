import connectDB from "@/db/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import generateToken from "@/lib/generateToken";

export const POST = async (req) => {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const user = await User.create({ name, email, password });
    return NextResponse.json(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        token: await generateToken(user._id)
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
