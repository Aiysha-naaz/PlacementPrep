import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  videoLink: String,
  completed: { type: Boolean, default: false }, // track lesson completion
});

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
    topics: [topicSchema], // array of topics instead of flat lessons
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
