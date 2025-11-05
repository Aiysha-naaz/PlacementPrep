import mongoose from "mongoose";
import Question from "./models/Question.js";

// Connect to MongoDB
mongoose.connect("mongodb+srv://naaz83651_db_user:oZxV6MF8LbSlnK2L@cluster1.hqbeuks.mongodb.net/?appName=Cluster1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

const questions = [
  {
    roundId: 1,
    q: "What is 2 + 2?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "4"
  },
  {
    roundId: 1,
    q: "What is 5 * 3?",
    options: ["15", "10", "8", "20"],
    correctAnswer: "15"
  },
  // Add 8 more questions for round 1
  {
    roundId: 1,
    q: "What is 10 / 2?",
    options: ["2", "5", "10", "20"],
    correctAnswer: "5"
  },
  {
    roundId: 1,
    q: "What is 7 - 3?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4"
  },
  {
    roundId: 1,
    q: "What is 9 + 6?",
    options: ["14", "15", "16", "17"],
    correctAnswer: "15"
  },
  {
    roundId: 1,
    q: "What is 8 * 2?",
    options: ["14", "15", "16", "18"],
    correctAnswer: "16"
  },
  {
    roundId: 1,
    q: "What is 12 / 4?",
    options: ["2", "3", "4", "6"],
    correctAnswer: "3"
  },
  {
    roundId: 1,
    q: "What is 6 + 7?",
    options: ["12", "13", "14", "15"],
    correctAnswer: "13"
  },
  {
    roundId: 1,
    q: "What is 9 - 5?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4"
  },
  {
    roundId: 1,
    q: "What is 3 * 3?",
    options: ["6", "8", "9", "12"],
    correctAnswer: "9"
  },
];

const seedDB = async () => {
  await Question.deleteMany({ roundId: 1 }); // remove existing questions for round 1
  await Question.insertMany(questions);
  console.log("Questions Seeded!");
  mongoose.connection.close();
};

seedDB();
