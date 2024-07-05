import mongoose,{ Schema } from "mongoose";

const subtopicSchema = new Schema({
  subtopicName : String,
  topicName:String,
  subjectName : String
});


const Subtopic =mongoose.models.Subtopic ||  mongoose.model('Subtopic', subtopicSchema);
module.exports = Subtopic;
