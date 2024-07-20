import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Question from "@/database/models/questionSchema";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();
    const {id} = await req.json()
    const userId = id;
    console.log("id is ",id)

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const countToday = await Question.aggregate([
      {
        $match: {
          createdBy:  new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: todayStart, $lt: todayEnd },
        },
      },
      {
        $count: "totalCount",
      },
    ]);
    const totalToday = countToday.length > 0 ? countToday[0].totalCount : 0;
    console.log(`Total documents created by the user today: ${totalToday}`);

    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    weekEnd.setHours(23, 59, 59, 999);

    const countThisWeek = await Question.aggregate([
      {
        $match: {
          createdBy:  new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: weekStart, $lt: weekEnd },
        },
      },
      {
        $count: "totalCount",
      },
    ]);

    const totalThisWeek =
      countThisWeek.length > 0 ? countThisWeek[0].totalCount : 0;
    console.log(
      `Total documents created by the user this week: ${totalThisWeek}`
    );

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    monthEnd.setHours(23, 59, 59, 999);

    const countThisMonth = await Question.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: monthStart, $lt: monthEnd },
        },
      },
      {
        $count: "totalCount",
      },
    ]);

    const totalThisMonth =
      countThisMonth.length > 0 ? countThisMonth[0].totalCount : 0;
    console.log(
      `Total documents created by the user this month: ${totalThisMonth}`
    );

    const data = {
        totalToday,totalThisWeek,totalThisMonth
    }

    // Send a success response
    return NextResponse.json({
      success: true,
      message: "users fetched successfully",
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
