// import express from "express";
// import Course from "../models/Course.js";

// const router = express.Router();

// // Get all courses (for Courses page)
// router.get("/", async (req, res) => {
//   try {
//     const courses = await Course.find({}, "title description image"); // only required fields
//     res.json(courses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get single course by ID (for Curriculum page)
// router.get("/:id", async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });
//     res.json(course);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add a new course (optional, for admin)
// // router.post("/", async (req, res) => {
// //   const { title, description, image, lessons } = req.body;
// //   const course = new Course({ title, description, image, lessons });

// //   try {
// //     const newCourse = await course.save();
// //     res.status(201).json(newCourse);
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // });


// // Get all courses (for Courses page)
// router.get("/", async (req, res) => {
//   try {
//     const courses = await Course.find({}, "title description image topics"); // include topics
//     res.json(courses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });




// // PATCH /api/courses/:courseId/lesson/:lessonId
// router.patch("/:courseId/lesson/:lessonId", async (req, res) => {
//   try {
//     const { courseId, lessonId } = req.params;
//     const { completed } = req.body;

//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: "Course not found" });

//     let found = false;
//     course.topics.forEach(topic => {
//       topic.lessons.forEach(lesson => {
//         if (lesson._id.toString() === lessonId) {
//           lesson.completed = completed;
//           found = true;
//         }
//       });
//     });

//     if (!found) return res.status(404).json({ message: "Lesson not found" });

//     await course.save();
//     res.json({ message: "Lesson updated", course });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// export default router;
import express from "express";
import Course from "../models/Course.js";

const router = express.Router();


router.post("/", async (req, res) => {
  const { title, description, image, topics } = req.body; // get topics, not lessons
  const course = new Course({ title, description, image, topics }); // save topics

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Get all courses (include nested topics and lessons)
router.get("/", async (req, res) => {
  try {
    // Populate topics and lessons if they are referenced documents, 
    // otherwise include them directly if embedded subdocuments
    const courses = await Course.find()
      .populate({
        path: "topics",
        populate: { path: "lessons" },
      });

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single course by ID (with nested topics and lessons)
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: "topics",
        populate: { path: "lessons" },
      });
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH - Update lesson completion status inside a course
router.patch("/:courseId/lesson/:lessonId", async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const { completed } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    let found = false;
    course.topics.forEach((topic) => {
      topic.lessons.forEach((lesson) => {
        if (lesson._id.toString() === lessonId) {
          lesson.completed = completed;
          found = true;
        }
      });
    });

    if (!found) return res.status(404).json({ message: "Lesson not found" });

    await course.save();
    res.json({ message: "Lesson updated", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
