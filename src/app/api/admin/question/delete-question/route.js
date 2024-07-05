import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Question from "@/database/models/questionSchema";
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();
    // Parse the request body
    const body = await req.json();
    const {questionId}= body;
    const question = Question.findByIdAndDelete(questionId)

    // Send a success response
    return NextResponse.json({
      success: true,
      message: "Question fetched successfully",
      data: question,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
