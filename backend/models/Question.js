import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  roundId: Number,
  q: String,
  options: [String],
  answer: String,   // Correct answer
  topic: String     // Topic of the question
});

export default mongoose.model("Question", questionSchema);
