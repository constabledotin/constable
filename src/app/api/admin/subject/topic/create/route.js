import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Topic from "@/database/models/topicSchema";
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();
    const body = await req.json();
    const { topicName, subjectName } = body;
    const topic = new Topic({
      topicName: topicName,
      subjectName: subjectName,
    });
    await topic.save();
    // Send a success response
    return NextResponse.json({
      success: true,
      message: "Subtopic created successfully",
      data: topic,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
