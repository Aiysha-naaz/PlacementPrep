// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import userRoutes from "./routes/userRoutes.js";
// import questionRoutes from "./routes/questionRoutes.js";
// import dashboardRoutes from "./routes/dashboard.js";
// import interviewRoutes from "./routes/interviews.js"; // ✅ Use import instead of require

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api", userRoutes);
// app.use("/api/questions", questionRoutes);
// app.use("/api", dashboardRoutes);
// app.use("/api/interviews", interviewRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend is running successfully!");
// });

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questions.js";
// import dashboardRoutes from "./routes/dashboard.js";
import interviewRoutes from "./routes/interviews.js";
import resultsRoute from "./routes/results.js";

import roundsRoute from "./routes/rounds.js";
import coursesRouter from "./routes/courses.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
// app.use("/api", dashboardRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/results", resultsRoute);
app.use("/api/rounds", roundsRoute);
app.use("/api/courses", coursesRouter);


app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB Error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
