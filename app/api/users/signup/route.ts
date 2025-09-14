import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { firstName, lastName, email, password, phone, governmentId } =
      reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User alreasy exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      governmentId,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
