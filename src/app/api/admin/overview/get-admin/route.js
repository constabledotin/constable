import { NextResponse } from "next/server";
import connectToDB from "@/database";
import User from "@/database/models/userSchema";
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();
    const users = await User.find({
        role: { $in: ["admin", "moderator"] }
      });

    // Send a success response
    return NextResponse.json({
      success: true,
      message: "users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
