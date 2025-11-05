// // backend/routes/questions.js
// import express from "express";
// import Question from "../models/Question.js";

// const router = express.Router();

// // Example route to get all questions
// router.get("/", async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.json(questions);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// router.get("/", async (req, res) => {
//   const { roundId } = req.query;
//   try {
//     const questions = await Question.find({ roundId });
//     res.json(questions);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;
import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// Get questions by roundId
router.get("/", async (req, res) => {
  try {
    const { roundId } = req.query;
    const questions = await Question.find({ roundId: parseInt(roundId) });
    res.json(questions); // send questions including answer & topic
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
