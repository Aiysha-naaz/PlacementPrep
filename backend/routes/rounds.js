import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// Get questions for a round
router.get("/:id/questions", async (req, res) => {
  try {
    const roundId = parseInt(req.params.id);
    const questions = await Question.find({ roundId });
    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
