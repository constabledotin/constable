import mongoose, { Schema } from "mongoose";
import User from "@/database/models/userSchema";

const questionSchema = new Schema(
  {
    options: {
      type: [String],
    },
    question: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    subtopic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    videoLink: {
      type: String,
      default: "",
    },
    answer: {
      type: String,
      required: true,
    },
    createdBy: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    
  },
  {
    timestamps: true,
  }
);

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);
module.exports = Question;
