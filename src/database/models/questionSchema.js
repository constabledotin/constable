import mongoose, { Schema } from "mongoose";
import User from "@/database/models/userSchema";

const questionSchema = new Schema(
  {
    qid: {
      type: String,
      unique: true,
    },
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
    history : [{
      examYear: String,
      examName : String
    }],
    extraInfo : String,
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

// Pre-save hook to generate QID
questionSchema.pre("save", function (next) {
  if (!this.qid) { // Check if QID is not already set
    const subjectCode = this.subject.slice(0, 2).toUpperCase(); // Take first 2 chars of subject
    const topicCode = this.topic.slice(0, 2).toUpperCase(); // Take first 2 chars of topic
    const timestamp = new Date().getTime(); // Get the current timestamp
    this.qid = `${subjectCode}${topicCode}${timestamp}`;
  }
  next();
});


const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);
module.exports = Question;
