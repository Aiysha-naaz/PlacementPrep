


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../styles/InterviewDetail.css";

const InterviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [interview, setInterview] = useState(null);
  const [activeTab, setActiveTab] = useState("topics");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/interviews/${id}`);
        setInterview(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInterview();
  }, [id]);

  if (!interview) return <p>Loading...</p>;

  const userStatus = interview.applicants?.find(a => a.user === user?._id)?.status || "Pending";

  return (
    <div className="interview-detail-wrapper">
      <Sidebar />
      <div className="interview-detail-container">
        <h1>{interview.title}</h1>
        <p className="company">{interview.company}</p>
        <p>{new Date(interview.date).toLocaleDateString()} | {interview.stipend} | {interview.campus}</p>
        <p>Role: {interview.role}</p>
        <p>
          Status: <span className={`status-tag ${userStatus.toLowerCase()}`}>{userStatus}</span>
        </p>

        <div className="test-buttons">
          <button onClick={() => alert("Full Mock Test clicked")}>Full Mock Test</button>
          {/* <button onClick={() => alert("Practice Test clicked")}>Practice Test</button> */}
          <button onClick={() => navigate("/practice")}>Practice Test</button>
        </div>

        <div className="tab-navigation">
          <h3 className={activeTab === "topics" ? "active-tab" : ""} onClick={() => setActiveTab("topics")}>
            Required Topics
          </h3>
          <h3 className={activeTab === "questions" ? "active-tab" : ""} onClick={() => setActiveTab("questions")}>
            Past Questions
          </h3>
          <h3 className={activeTab === "tips" ? "active-tab" : ""} onClick={() => setActiveTab("tips")}>
            Candidate Tips
          </h3>
        </div>

        <div className="tab-content">
          {activeTab === "topics" && (
            <ul className="topics-list">
              {interview.topics.map((topic, index) => (
                <li key={index}>
                  <input type="checkbox" id={`topic-${index}`} />
                  <label htmlFor={`topic-${index}`}>{topic}</label>
                </li>
              ))}
            </ul>
          )}

          {activeTab === "questions" && (
            <ul className="questions-list">
              {interview.pastQuestions.map((q, index) => (
                <li key={index}>
                  <p><strong>Q:</strong> {q.q}</p>
                  <p><strong>A:</strong> {q.a}</p>
                </li>
              ))}
            </ul>
          )}

          {activeTab === "tips" && (
            <ul className="tips-list">
              {interview.candidateTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          )}
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>← Back to Interviews</button>
      </div>
    </div>
  );
};

export default InterviewDetail;
