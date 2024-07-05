import mongoose,{ Schema } from "mongoose";
import { type } from "os";

const topicSchema = new Schema({
  topicName:{
    type : String,
    unique :true
  },
  subjectName : String
});


const Topic =mongoose.models.Topic ||  mongoose.model('Topic', topicSchema);
module.exports = Topic;
