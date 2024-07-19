import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Question from "@/database/models/questionSchema";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();
    const session = await getServerSession(authOptions)
    const userId = session.user.id

    // Parse the request body
    const body = await req.json();
    const {
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

    const trimmedOptions = options.map(option => option.trim());

    // Create a new question document
    const newQuestion = new Question({
      question: question,
      solution: solution,
      options: trimmedOptions,
      subject: subjectName,
      topic: topicName,
      subtopic: subtopicName,
      difficulty: difficulty,
      videoLink: videoLink,
      answer: answer.trim(),
      createdBy : userId
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
    },{
      status : 500
    });
  }
}
