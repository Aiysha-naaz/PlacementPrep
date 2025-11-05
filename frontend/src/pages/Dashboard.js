
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [result, setResult] = useState(null);
  const [courses, setCourses] = useState([]);  // state for fetched courses
  const navigate = useNavigate();

  const handleWatchClick = (courseId) => {
    // navigate to course details or course page
    navigate(`/courses/${courseId}`);
  };

  useEffect(() => {
    // Load last test result from localStorage
    const lastResult = localStorage.getItem("lastTestResult");
    if (lastResult) {
      setResult(JSON.parse(lastResult));
    }

    // Fetch courses from backend API
    fetch("http://localhost:5000/api/courses")

      .then(res => res.json())
      .then(data => {
        setCourses(data); // set courses state
      })
      .catch(err => {
        console.error("Failed to fetch courses:", err);
      });
  }, []);

  if (!result) return <p>Loading results...</p>;

  const { roundTitle, totalQuestions, answers, timeTaken } = result;

  // Calculate correct, wrong, unattempted dynamically
  const answersArray = Object.values(answers || {});
  const correct = answersArray.filter(a => a.isCorrect).length;
  const attempted = answersArray.length;
  const wrong = attempted - correct;
  const unattempted = totalQuestions - attempted;
  const percentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

  // Analysis by topic
  const topicStats = {};
  answersArray.forEach(a => {
    if (!topicStats[a.topic]) topicStats[a.topic] = { correct: 0, total: 0 };
    topicStats[a.topic].total += 1;
    if (a.isCorrect) topicStats[a.topic].correct += 1;
  });

  const analysis = Object.keys(topicStats).map(topic => ({
    label: topic,
    value: Math.round((topicStats[topic].correct / topicStats[topic].total) * 100),
  }));

  const improvements = Object.keys(topicStats)
    .map(topic => ({
      label: topic,
      value: 100 - Math.round((topicStats[topic].correct / topicStats[topic].total) * 100),
    }))
    .filter(i => i.value > 0);

  const nextRounds = [
    { title: "Aptitude Round 2" },
    { title: "Coding Round 1" },
    { title: "HR Round 1" },
  ];

  const formatTime = sec => `${Math.floor(sec / 60)}m ${sec % 60}s`;

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-container">
        {/* Top Section: Test Results and Score */}
        <div className="test-score-section">
          <h1>Test Results: {roundTitle}</h1>
          <div className="score-box">
            <div className="score-text">
              <h2>{correct}/{totalQuestions}</h2>
            </div>
            <div className="score-info">
              <div className="circular-bar">
                <svg>
                  <circle className="circle-bg" cx="60" cy="60" r="54"></circle>
                  <circle
                    className="circle"
                    cx="60"
                    cy="60"
                    r="54"
                    strokeDasharray={339.292}
                    strokeDashoffset={339.292 - (339.292 * percentage) / 100}
                  ></circle>
                  <text x="60" y="65" className="percentage-text">{percentage}%</text>
                </svg>
              </div>
              <div className="score-info-details">
                <p>Correct: {correct}</p>
                <p>Wrong: {wrong}</p>
                <p>Unattempted: {unattempted}</p>
                <p>Time: {formatTime(timeTaken)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Analysis and Recommendations */}
        <div className="main-content">
          {/* Analysis */}
          <div className="left-column">
            <div className="analysis-section">
              <h2>Analysis</h2>
              {analysis.map((item, idx) => (
                <div className="progress-container" key={idx}>
                  <span>{item.label}</span>
                  <div className="progress-bar green">
                    <div className="progress-fill" style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Areas of Improvement */}
            <div className="improvement-section">
              <h2>Areas of Improvement</h2>
              {improvements.length === 0 ? (
                <p>Great job! No weak topics.</p>
              ) : (
                improvements.map((item, idx) => (
                  <div className="progress-container" key={idx}>
                    <span>{item.label}</span>
                    <div className="progress-bar red">
                      <div className="progress-fill" style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))
              )}
              {improvements.length > 0 && <button className="practice-weak-btn">Practice Weak Topics</button>}
            </div>
          </div>

          {/* Recommended Videos */}
          <div className="recommendation-section">
            <h2>Recommended Videos</h2>
            <div className="videos-list">
              {courses.length === 0 ? (
                <p>No recommended courses.</p>
              ) : (
                courses.map(course => (
                  <div className="video-card" key={course._id} onClick={() => handleWatchClick(course._id)}>
                    <img src={course.image} alt={course.title} />
                    <div className="video-info">
                      <h4>{course.title}</h4>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Next Rounds */}
        <div className="next-rounds-section">
          <h2>Next Rounds to Attempt</h2>
          <div className="rounds-grid">
            {nextRounds.map((round, idx) => (
              <div className="next-round-card" key={idx}>
                <span>{round.title}</span>
                <button>Start</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
