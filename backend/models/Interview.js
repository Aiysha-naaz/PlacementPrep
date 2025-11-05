// // import mongoose from "mongoose";

// // const interviewSchema = new mongoose.Schema({
// //   userId: { type: String, required: true },
// //   role: { type: String, required: true },
// //   company: { type: String, required: true },
// //   status: { type: String, default: "Upcoming" },
// //   date: { type: Date, default: Date.now }
// // });

// // const Interview = mongoose.model("Interview", interviewSchema);
// // export default Interview;
// import mongoose from "mongoose";

// const interviewSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     company: String,
//     date: Date,
//     stipend: String,
//     campus: String,
//     role: String,
//     applicants: [
//       {
//         user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//         status: { type: String, enum: ["Pending", "Completed", "Rejected"], default: "Pending" },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Interview = mongoose.model("Interview", interviewSchema);
// export default Interview;



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
