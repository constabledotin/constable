import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Subtopic from "@/database/models/subtopicSchema";
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();

    const body = await req.json();
    const {subjectName,topicName} = body;
    const query = {
      subjectName : subjectName,
      topicName : topicName
    }

    const Subtopics = await Subtopic.find(query);
    // Send a success response
    return NextResponse.json({
      success: true,
      message: "Subtopic fetched successfully",
      data: Subtopics,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
