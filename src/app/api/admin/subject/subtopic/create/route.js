import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Subtopic from "@/database/models/subtopicSchema";
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();
    const body = await req.json();
    const { subtopicName,subjectName,topicName } = body;
    const subtopic = new Subtopic({
      subtopicName: subtopicName,
      subjectName : subjectName,
      topicName : topicName
    });
    await subtopic.save();
    // Send a success response
    return NextResponse.json({
      success: true,
      message: "Subtopic created successfully",
      data: subtopic,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
