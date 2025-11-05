import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  roundTitle: { type: String, required: true },
  totalQuestions: Number,
  correct: Number,
  wrong: Number,
  unattempted: Number,
  timeTaken: Number, // in seconds
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Result", resultSchema);
