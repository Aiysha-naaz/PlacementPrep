

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Interview.css";

const Interview = () => {
  const [user, setUser] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("All");
  const [showCalendar, setShowCalendar] = useState(false);
  const [newInterviewDate, setNewInterviewDate] = useState("");
  const [nextInterviewDate, setNextInterviewDate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/interviews");
      setInterviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const markCompleted = async (interviewId) => {
    try {
      await axios.patch(`http://localhost:5000/api/interviews/${interviewId}/complete`, {
        userId: user._id,
      });
      fetchInterviews();
    } catch (err) {
      console.log(err);
    }
  };

  const scheduleInterview = () => {
    if (!newInterviewDate) return alert("Please select a date");

    setNextInterviewDate(new Date(newInterviewDate));
    setShowCalendar(false);
    setNewInterviewDate("");
  };

  // Filter interviews based on selected filters
  const filteredInterviews = interviews.filter((i) => {
    const roleMatch = selectedRole === "All Roles" || i.role === selectedRole;
    const packageMatch = selectedPackage === "All" || i.stipend === selectedPackage;
    const dateMatch = !selectedDate || i.date.slice(0, 10) === selectedDate;
    return roleMatch && packageMatch && dateMatch;
  });

  // User's completed interviews
  const completedInterviews = interviews.filter(
    (i) => i.applicants?.find((a) => a.user === user?._id)?.status === "Completed"
  );

  // Next interview based on pending status and soonest date OR from user scheduled date
  const serverNextInterview = interviews
    .filter((i) => {
      const status = i.applicants?.find((a) => a.user === user?._id)?.status;
      return !status || status === "Pending";
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  const nextInterview = nextInterviewDate || (serverNextInterview && new Date(serverNextInterview.date));

  const performanceScore = completedInterviews.length
    ? Math.round((completedInterviews.length / interviews.length) * 100)
    : 0;

  const roles = ["All Roles", "Frontend", "Backend", "UI/UX", "AI", "SDE"];
  const packages = ["All", "5k", "10k", "12k", "15k"];

  return (
    <div className="interviews-wrapper dark-theme">
      <Sidebar />
      <div className="interviews-container">
        <h1>Welcome back, {user?.name || "User"} 👋</h1>

        {/* Stats Row */}
        <div className="stats-row">

          <div className="stat-box">
            <p>Interviews Completed</p>
            <h3>{completedInterviews.length}</h3>
          </div>

          <div className="stat-box">
            <p>Next Interview</p>
            <h3>{nextInterview ? nextInterview.toLocaleDateString() : "N/A"}</h3>
            {!nextInterview && (
              <button className="schedule-btn" onClick={() => setShowCalendar(true)}>
                + Schedule Interview
              </button>
            )}
          </div>

          <div className="stat-box">
            <p>Performance Score</p>
            <h3>{performanceScore}%</h3>
          </div>

          {/* If you want to always allow scheduling, consider moving button outside condition */}
          {nextInterview && (
            <div className="stat-box">
              <button className="schedule-btn" onClick={() => setShowCalendar(true)}>
                Reschedule Interview
              </button>
            </div>
          )}
        </div>

        {/* Calendar Modal */}
        {showCalendar && (
          <div className="calendar-modal">
            <input
              type="date"
              value={newInterviewDate}
              onChange={(e) => setNewInterviewDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
            />
            <button onClick={scheduleInterview}>Confirm</button>
            <button onClick={() => setShowCalendar(false)}>Cancel</button>
          </div>
        )}

        {/* Filters */}
        <div className="filters-add-container">
          <div className="filters-section">
            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              {roles.map((role, i) => (
                <option key={i}>{role}</option>
              ))}
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <select value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}>
              {packages.map((pkg, i) => (
                <option key={i}>{pkg}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Interview Cards */}
        <div className="interview-cards-grid">
          {filteredInterviews.length > 0 ? (
            filteredInterviews.map((item) => {
              const userStatus = item.applicants?.find((a) => a.user === user?._id)?.status || "Pending";

              return (
                <div
                  className="interview-card"
                  key={item._id}
                  onClick={() => navigate(`/interview/${item._id}`)}
                >
                  <div className="image-placeholder"></div>
                  <h4>{item.title}</h4>
                  <p className="company">{item.company}</p>
                  <p className="date">{item.date.slice(0, 10)}</p>
                  <p className="stipend">{item.stipend}</p>
                  <div className="card-bottom">
                    <span>{item.campus}</span>
                    <span
                      className={`status-tag ${
                        userStatus === "Completed"
                          ? "completed"
                          : userStatus === "Pending"
                          ? "pending"
                          : "rejected"
                      }`}
                    >
                      {userStatus}
                    </span>
                    <span>{item.role}</span>
                  </div>
                  {userStatus !== "Completed" && (
                    <button
                      className="complete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        markCompleted(item._id);
                      }}
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p style={{ color: "#aaa", margin: "20px" }}>No interviews found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;
