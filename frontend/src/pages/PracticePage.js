import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/PracticePage.css";

const PracticePage = () => {
  const navigate = useNavigate();
  const rounds = [
    {
      id: 1,
      title: "Aptitude Round",
      topics: ["Logical Reasoning", "Verbal Ability"],
    },
    {
      id: 2,
      title: "Coding Round",
      topics: ["Array", "Strings", "DSA"],
    },
    {
      id: 3,
      title: "HR Round",
      topics: ["Self Introduction", "Strengths & Weaknesses"],
    },
  ];

  const [selectedLevel, setSelectedLevel] = useState({}); // track per round

  const handleStart = (roundId) => {
    navigate(`/practice-round/${roundId}`);
  };

  return (
    <div className="practice-wrapper">
      <Sidebar />
      <div className="practice-container">
        <h1>Challenge Yourself</h1>
        <p>Choose a round to practice</p>

        <div className="round-cards-horizontal">
          {rounds.map((round) => (
            <div className="round-card" key={round.id}>
              <h3>{round.title}</h3>

              {/* Topics */}
              <div className="topics-list">
                {round.topics.map((topic, index) => (
                  <span key={index}>{topic}</span>
                ))}
              </div>

              {/* Levels as slider-style selection */}
              <div className="levels-slider">
                {["Easy", "Medium", "Hard"].map((level) => (
                  <div
                    key={level}
                    className={`level-option ${
                      selectedLevel[round.id] === level ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedLevel((prev) => ({ ...prev, [round.id]: level }))
                    }
                  >
                    {level}
                  </div>
                ))}
              </div>

              <button
                className="start-btn"
                onClick={() => handleStart(round.id)}
              >
                Start
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
