import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Subject from "@/database/models/subjectSchema";
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();

    const subjects = await Subject.find({});
    // Send a success response
    return NextResponse.json({
      success: true,
      message: "Subject fetched successfully",
      data: subjects,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
