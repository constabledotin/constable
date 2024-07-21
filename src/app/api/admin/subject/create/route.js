import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Subject from "@/database/models/subjectSchema";
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDB();
    const body = await req.json();
    const { subjectName } = body;
    const isSubject = await Subject.find({subjectName:subjectName});
    if(isSubject){
      return NextResponse.json(
        {
          success: false,
          message: "subject name is already added",
        },
        {
          status: 404,
        }
      );
    }

    const subject = new Subject({
      subjectName: subjectName,
    });
    await subject.save();
    // Send a success response
    return NextResponse.json({
      success: true,
      message: "Subject created successfully",
      data: subject,
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
