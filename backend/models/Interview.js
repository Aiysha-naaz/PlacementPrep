

import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  q: String,
  a: String,
});

const interviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: String,
    date: Date,
    stipend: String,
    campus: String,
    role: String,
    applicants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, default: "Pending" }, // Completed / Pending / Rejected
      },
    ],
    topics: [String], // Required topics
    pastQuestions: [questionSchema],
    candidateTips: [String],
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
