import { NextResponse } from "next/server";
import connectToDB from "@/database";
import ExamName from "@/database/models/examName";
export async function POST(req) {
  try {
    await connectToDB();
    const exam = await ExamName.find({});
    return NextResponse.json({
      success: true,
      message: "exam get successfully",
      data: exam,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again later",
      },
      {
        status: 500,
      }
    );
  }
}
