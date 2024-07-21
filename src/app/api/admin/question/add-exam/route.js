import { NextResponse } from "next/server";
import connectToDB from "@/database";
import ExamName from "@/database/models/examName";
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();
    // Parse the request body
    const { examName } = await req.json();
    const name = examName.trim();
    const isExam = await ExamName.find({name:name});
    if(isExam){
      return NextResponse.json(
        {
          success: false,
          message: "Exam name is already added",
        },
        {
          status: 404,
        }
      );
    }

    const exam = new ExamName({
      name: name,
    });

    // Save the question to the database
    await exam.save();

    // Send a success response
    return NextResponse.json({
      success: true,
      message: "exam saved successfully",
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
