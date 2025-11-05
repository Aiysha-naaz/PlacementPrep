// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import "../styles/InterviewDetail.css";

// const InterviewDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [interview, setInterview] = useState(null);
//   const [activeTab, setActiveTab] = useState("topics"); // "topics", "questions", "tips"

//   // Example interviews data
//   const interviews = [
//     {
//       id: 1,
//       title: "Software Engineer Intern",
//       company: "Google",
//       date: "2025-12-15",
//       stipend: "12k",
//       campus: "On-campus",
//       applied: "Yes",
//       role: "AI",
//     },
//     {
//       id: 2,
//       title: "Backend Developer Intern",
//       company: "Amazon",
//       date: "2025-11-28",
//       stipend: "15k",
//       campus: "Off-campus",
//       applied: "Pending",
//       role: "SDE",
//     },
//     {
//       id: 3,
//       title: "UI/UX Designer Intern",
//       company: "Brandimpetus",
//       date: "2025-11-20",
//       stipend: "10k",
//       campus: "Off-campus",
//       applied: "Rejected",
//       role: "UI/UX",
//     },
//   ];

//   // Example content
//   const topics = ["DSA", "System Design", "Database", "OOP", "React", "Node.js"];
//   const pastQuestions = [
//     { q: "Explain event loop in JS?", a: "JS uses a single-threaded event loop..." },
//     { q: "What is normalization in DB?", a: "Normalization is the process..." },
//   ];
//   const candidateTips = [
//     "Read the job description carefully.",
//     "Practice coding daily.",
//     "Revise basic DS & Algo concepts.",
//     "Be confident in interviews.",
//   ];

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);

//     const selected = interviews.find((i) => i.id === parseInt(id));
//     setInterview(selected);
//   }, [id]);

//   if (!interview) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="interview-detail-wrapper">
//       <Sidebar />
     
//       <div className="interview-detail-container">
//         <h1>{interview.title}</h1>
//         <p className="company">{interview.company}</p>
//         <p>{interview.date} | {interview.stipend} | {interview.campus}</p>
//         <p>Role: {interview.role}</p>
//         <p>Status: 
//           <span
//             className={`status-tag ${
//               interview.applied === "Yes"
//                 ? "applied"
//                 : interview.applied === "Pending"
//                 ? "pending"
//                 : "rejected"
//             }`}
//           >
//             {interview.applied}
//           </span>
//         </p>

//         {/* Test Buttons */}
//         <div className="test-buttons">
//           <button onClick={() => alert("Full Mock Test clicked")}>Full Mock Test</button>
//           <button onClick={() => alert("Practice Test clicked")}>Practice Test</button>
//         </div>
        

//         {/* Tab Navigation */}
//         <div className="tab-navigation">
//           <h3
//             className={activeTab === "topics" ? "active-tab" : ""}
//             onClick={() => setActiveTab("topics")}
//           >
//             Required Topics
//           </h3>
//           <h3
//             className={activeTab === "questions" ? "active-tab" : ""}
//             onClick={() => setActiveTab("questions")}
//           >
//             Past Questions
//           </h3>
//           <h3
//             className={activeTab === "tips" ? "active-tab" : ""}
//             onClick={() => setActiveTab("tips")}
//           >
//             Candidate Tips
//           </h3>
//         </div>

//         {/* Tab Content */}
//         <div className="tab-content">
//           {activeTab === "topics" && (
//             <ul className="topics-list">
//               {topics.map((topic, index) => (
//                 <li key={index}>
//                   <input type="checkbox" id={`topic-${index}`} />
//                   <label htmlFor={`topic-${index}`}>{topic}</label>
//                 </li>
//               ))}
//             </ul>
//           )}

//           {activeTab === "questions" && (
//             <ul className="questions-list">
//               {pastQuestions.map((q, index) => (
//                 <li key={index}>
//                   <p><strong>Q:</strong> {q.q}</p>
//                   <p><strong>A:</strong> {q.a}</p>
//                 </li>
//               ))}
//             </ul>
//           )}

//           {activeTab === "tips" && (
//             <ul className="tips-list">
//               {candidateTips.map((tip, index) => (
//                 <li key={index}>{tip}</li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <button className="back-btn" onClick={() => navigate(-1)}>← Back to Interviews</button>
//       </div>
//     </div>
//   );
// };

// export default InterviewDetail;




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
