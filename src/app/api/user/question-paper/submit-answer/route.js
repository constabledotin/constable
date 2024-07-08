import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Question from "@/database/models/questionSchema";
import User from "@/database/models/userSchema";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";


export async function POST(req, res) {
  const session = await getServerSession(authOptions);
  try {
    // Connect to the database
    await connectToDB();
    const body = await req.json();
    const { questionId, answer } = body;
    const userId = session.user.id;
    const question = await Question.findById(questionId);

    const is_correct = question.answer === answer;
    const user = await User.findById(userId);
    let { correct_streak, incorrect_streak } = user;

    if (is_correct) {
      correct_streak += 1;
      incorrect_streak = 0;
    } else {
      incorrect_streak += 1;
      correct_streak = 0;
    }

    // Update user's streaks
    await User.findByIdAndUpdate(userId, {
      correct_streak,
      incorrect_streak,
    });

    // Update user's level if streak reaches 10
    let newLevel = user.current_level;

    if (correct_streak >= 10) {
      newLevel = user.current_level + 1;
      if (newLevel > 5) {
        newLevel = 5; // Ensure current_level does not exceed 5
      }
      await User.findByIdAndUpdate(userId, {
        current_level: newLevel,
        correct_streak: 0,
      });
    } else if (incorrect_streak >= 10) {
      newLevel = user.current_level - 1;
      if (newLevel < 1) {
        newLevel = 1; // Ensure current_level does not go below 1
      }
      await User.findByIdAndUpdate(userId, {
        current_level: newLevel,
        incorrect_streak: 0,
      });
    }

    const data = {
      is_correct,
    };
    // Send a success response
    return NextResponse.json({
      success: true,
      message: "question fetched successfully",
      data: data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
