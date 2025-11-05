import express from "express";
import Result from "../models/Result.js";

const router = express.Router();

// Save user test result
router.post("/", async (req, res) => {
  try {
    const { roundTitle, totalQuestions, correct, wrong, unattempted, timeTaken } = req.body;

    const newResult = new Result({
      roundTitle,
      totalQuestions,
      correct,
      wrong,
      unattempted,
      timeTaken,
    });

    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Optional: Get all results (for dashboard)
router.get("/", async (req, res) => {
  try {
    const results = await Result.find().sort({ date: -1 });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
