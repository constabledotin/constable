import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Topic from "@/database/models/topicSchema";
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();

    const body = await req.json();
    const {subjectName} = body;
    let query;
    if(subjectName){
       query = {
        subjectName : subjectName
      }
    }

    const topics = await Topic.find(query);
    // Send a success response
    return NextResponse.json({
      success: true,
      message: "Topic fetched successfully",
      data: topics,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
