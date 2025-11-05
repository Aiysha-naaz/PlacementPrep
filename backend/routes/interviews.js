import express from "express";
import Interview from "../models/Interview.js";

const router = express.Router();

// GET all interviews
router.get("/", async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// GET single interview
router.get("/:id", async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ message: "Interview not found" });
    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// router.get("/:id", async (req, res) => {
//   try {
//     const interview = await Interview.findById(req.params.id);
//     if (!interview) return res.status(404).json({ message: "Interview not found" });
//     res.json(interview);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// POST a new interview
// router.post("/", async (req, res) => {
//   const { title, company, date, stipend, campus, role } = req.body;
//   const interview = new Interview({ title, company, date, stipend, campus, role });
//   try {
//     const newInterview = await interview.save();
//     res.status(201).json(newInterview);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


router.post("/", async (req, res) => {
  try {
    const { title, company, date, stipend, campus, role, topics, pastQuestions, candidateTips } = req.body;

    const interview = new Interview({
      title,
      company,
      date,
      stipend,
      campus,
      role,
      topics,
      pastQuestions,
      candidateTips,
      applicants: [], // empty initially
    });

    const savedInterview = await interview.save();
    res.status(201).json(savedInterview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH - mark interview as completed for a user
router.patch("/:id/complete", async (req, res) => {
  const { userId } = req.body;
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ message: "Interview not found" });

    const applicant = interview.applicants.find(a => a.user.toString() === userId);
    if (applicant) {
      applicant.status = "Completed";
    } else {
      interview.applicants.push({ user: userId, status: "Completed" });
    }

    await interview.save();
    res.json({ message: "Interview marked as completed", interview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
