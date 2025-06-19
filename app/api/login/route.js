import connectDB from "@/db/connect";
import User from "@/models/User";
import generateToken from "@/lib/generateToken";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    await connectDB();
    let data = await req.json();
    if (!data.email || !data.password) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
        );
    }
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
        );
    }
    if (!(await user.matchPassword(password))) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }
    return NextResponse.json(
        {
            id: user._id,
            name: user.name,
            email: user.email,
            token: await generateToken(user._id)
        },
        { status: 200 }
    );


}