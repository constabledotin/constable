import { NextResponse } from "next/server";
import connectToDB from "@/database";
import User from "@/database/models/userSchema";
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    await connectToDB();
    // Parse the request body
    const body = await req.json();
    const {
      name,
      email,
      password,
    } = body;
    const hashedPassword = await bcrypt.hash(password,10)

    console.log(body,hashedPassword)
    const newUser = new User({
      name: name,
      email: email,
      password : hashedPassword,
    });

    // Save the question to the database
    await newUser.save();

    // Send a success response
    return NextResponse.json({
      success: true,
      message: "Question saved successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
