import mongoose,{ Schema } from "mongoose";

const subjectSchema = new Schema({
  subjectName:String
});


const Subject =mongoose.models.Subject ||  mongoose.model('Subject', subjectSchema);
module.exports = Subject;
