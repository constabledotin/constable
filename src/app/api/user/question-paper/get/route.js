import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Question from "@/database/models/questionSchema"
import User from "@/database/models/userSchema"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";


export async function POST(req,res) {
    const session = await getServerSession(authOptions)
  try {
    // Connect to the database
    await connectToDB();
    console.log(session.user.id)
    const userId = session.user.id
    const user = await User.findById(userId);
    const question = await Question.aggregate([
      { $match: { difficulty: user.current_level } }, // Match questions with the user's current level
      { $sample: { size: 1 } } // Get a random question (adjust `size` as needed)
    ]);
    // Send a success response
    return NextResponse.json({
      success: true,
      message: "question fetched successfully",
      data: question[0],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
