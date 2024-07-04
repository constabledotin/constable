import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Question from "@/database/models/questionSchema";
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();
    // Parse the request body
    const body = await req.json();
    const {
      question,
      solution,
      subject,
      topic,
      subtopic,
      difficulty,
      videoLink,
      answer,
      options,
    } = body;

    // Create a new question document
    const newQuestion = new Question({
      question: question,
      solution: solution,
      options: options,
      subject: subject,
      topic: topic,
      subtopic: subtopic,
      difficulty: difficulty,
      videoLink: videoLink,
      answer: answer,
    });

    // Save the question to the database
    await newQuestion.save();

    // Send a success response
    return NextResponse.json({
      success: true,
      message: "Question saved successfully",
      data: newQuestion,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}