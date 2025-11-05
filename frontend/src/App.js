
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Interview from "./pages/Interview";
import InterviewDetail from "./pages/InterviewDetail";
import PracticePage from "./pages/PracticePage";
import PracticeRound from "./pages/PracticeRound";
import Courses from "./pages/Courses";
import Curriculum from "./pages/Curriculum";
import Resume from "./pages/Resume";
import { FaBell, FaUserCircle } from "react-icons/fa"; // react-icons for bell & profile
import TopBar from "./components/TopBar";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          marginLeft: "240px",
          flex: 1,
          padding: "20px",
          backgroundColor: "#000", // black background
          color: "white",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* Top Right Icons */}
        <TopBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/interview/:id" element={<InterviewDetail />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice-round/:id" element={<PracticeRound />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<Curriculum />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
