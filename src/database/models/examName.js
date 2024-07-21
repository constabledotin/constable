import mongoose, { Schema } from "mongoose";

const examNameSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ExamName =
  mongoose.models.ExamName || mongoose.model("ExamName", examNameSchema);
module.exports = ExamName;
