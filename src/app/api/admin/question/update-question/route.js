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
      questionId,
      question,
      solution,
      subjectName,
      topicName,
      subtopicName,
      difficulty,
      videoLink,
      answer,
      options,
    } = body;

    const updatedQuestion = await Question.findByIdAndUpdate(questionId, {
      question: question,
      solution: solution,
      options: options,
      subject: subjectName,
      topic: topicName,
      subtopic: subtopicName,
      difficulty: difficulty,
      videoLink: videoLink,
      answer: answer,
    });
    return NextResponse.json({
      success: true,
      message: "Question updated successfully",
      data: updatedQuestion,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
