import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Question from "@/database/models/questionSchema";

export async function POST(req) {
  try {
    await connectToDB(); // Connect to MongoDB

    // Parse the request body
    const body = await req.json();
    const { heading, subheading, questions } = body.formData;

    // Use map instead of forEach to create an array of promises
    const dataPromises = questions.map(async (questionData, index) => {
      const topic = questionData[`topic_${index}`];
      const subtopic = questionData[`subtopic_${index}`];
      const difficulty = parseInt(questionData[`difficulty_${index}`]);
      const noOfQuestion = parseInt(questionData[`noOfQuestion_${index}`]);

      const question = await Question.aggregate([
        {
          $match: {
            topic: topic,
            subtopic: subtopic,
            difficulty: difficulty,
          },
        },
        { $sample: { size: noOfQuestion } },
      ]);

      return question; // Return the promise from aggregate
    });

    // Wait for all promises to resolve
    const data = await Promise.all(dataPromises);

    return NextResponse.json({
      success: true,
      message: "Question saved successfully",
      data: data[0],
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
