// import React, { useEffect, useState } from "react";
// import "../styles/Dashboard.css";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [selectedRole, setSelectedRole] = useState("All Roles");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedPackage, setSelectedPackage] = useState("All");

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);
//   }, []);

//   const stats = [
//     { label: "Total Interviews", value: 5 },
//     { label: "Completed", value: 3 },
//     { label: "Upcoming Mock", value: "Dec 15, 2025" },
//   ];

//   const roles = ["All Roles", "Frontend", "Backend", "UI/UX", "AI", "SDE"];
//   const packages = ["All", "5k", "12k", "15k"];

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
//       applied: "Yes",
//       role: "UI/UX",
//     },
//   ];

//   const filteredInterviews = interviews.filter((i) => {
//     const roleMatch =
//       selectedRole === "All Roles" || i.role === selectedRole;
//     const packageMatch =
//       selectedPackage === "All" || i.stipend === selectedPackage;
//     const dateMatch = !selectedDate || i.date === selectedDate;
//     return roleMatch && packageMatch && dateMatch;
//   });

//   return (
//     <div className="dashboard-container">
//       {/* Header */}
//       <div className="dashboard-header">
//         <h2>Dashboard</h2>
//         <div className="icons">
//           <span>🔔</span>
//           <span>⚙️</span>
//         </div>
//       </div>

//       {/* Welcome */}
//       <div className="welcome-section">
//         <h1>Welcome back, {user?.name || "User"} 👋</h1>
//       </div>

//       {/* Stats */}
//       <div className="stats-section">
//         {stats.map((stat, i) => (
//           <div className="stat-card" key={i}>
//             <p>{stat.label}</p>
//             <h2>{stat.value}</h2>
//           </div>
//         ))}
//       </div>

//       {/* My Interviews Section */}
//       <div className="interview-section">
//         <div className="section-header">
//           <h3>My Interviews</h3>
//         </div>

//         {/* Filters + Add Button */}
//         <div className="filters-add-container">
//           <div className="filters-section">
//             <select
//               value={selectedRole}
//               onChange={(e) => setSelectedRole(e.target.value)}
//             >
//               {roles.map((role, i) => (
//                 <option key={i}>{role}</option>
//               ))}
//             </select>

//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//             />

//             <select
//               value={selectedPackage}
//               onChange={(e) => setSelectedPackage(e.target.value)}
//             >
//               {packages.map((pkg, i) => (
//                 <option key={i}>{pkg}</option>
//               ))}
//             </select>
//           </div>

//           <button className="add-btn">+ Add Interview</button>
//         </div>

//         {/* Interview Cards Horizontal */}
//         <div className="interview-cards-horizontal">
//           {filteredInterviews.length > 0 ? (
//             filteredInterviews.map((item) => (
//               <div className="interview-card" key={item.id}>
//                 <div className="image-placeholder"></div>
//                 <h4>{item.title}</h4>
//                 <p className="company">{item.company}</p>
//                 <p className="date">{item.date}</p>
//                 <p className="stipend">{item.stipend}</p>
//                 <div className="card-bottom">
//                   <span>{item.campus}</span>
//                   <span>{item.applied}</span>
//                   <span>{item.role}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p style={{ color: "#aaa", margin: "20px" }}>No interviews found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;














// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import "../styles/Dashboard.css";

// const Dashboard = () => {
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     // Fetch last test result from localStorage
//     const lastResult = localStorage.getItem("lastTestResult");
//     if (lastResult) {
//       setResult(JSON.parse(lastResult));
//     }
//   }, []);

//   if (!result) return <p>Loading results...</p>;

//   const { roundTitle, totalQuestions, correct, wrong, unattempted, answers } = result;

//   const percentage = Math.round((correct / totalQuestions) * 100);

//   // -------------------------------
//   // Dynamic Analysis
//   // -------------------------------
//   const analysis = [
//     { label: "Score Percentage", value: percentage },
//     { label: "Attempted Questions", value: Math.round(((totalQuestions - unattempted) / totalQuestions) * 100) },
//     { label: "Time Efficiency", value: Math.min(Math.round((result.timeTaken / (20 * 60)) * 100), 100) },
//   ];

//   // -------------------------------
//   // Dynamic Weakness / Improvement Areas
//   // Assume answers object has questionId => { topic, isCorrect }
//   // We'll count the wrong/unattempted per topic
//   // -------------------------------
//   const topicStats = {}; // { topic: { wrong: x, unattempted: y, total: z } }

//   if (answers) {
//     Object.values(answers).forEach((ans) => {
//       const topic = ans.topic || "General";
//       if (!topicStats[topic]) topicStats[topic] = { wrong: 0, unattempted: 0, total: 0 };

//       topicStats[topic].total += 1;
//       if (ans.selected === null || ans.selected === undefined) topicStats[topic].unattempted += 1;
//       else if (!ans.isCorrect) topicStats[topic].wrong += 1;
//     });
//   }

//   const improvements = Object.keys(topicStats).map((topic) => {
//     const t = topicStats[topic];
//     // Improvement percentage: proportion of incorrect/unattempted questions
//     const value = Math.round(((t.wrong + t.unattempted) / t.total) * 100);
//     return { label: topic, value };
//   });

//   // -------------------------------
//   // Recommended Courses (simple example)
//   // -------------------------------
//   const recommendedCourses = improvements
//     .filter((item) => item.value > 0)
//     .map((item) => ({
//       title: `Improve ${item.label}`,
//       link: "#",
//     }));

//   // -------------------------------
//   // Next Rounds (static placeholder)
//   // -------------------------------
//   const nextRounds = [
//     { title: "Aptitude Round 2" },
//     { title: "Coding Round 1" },
//     { title: "HR Round 1" },
//   ];

//   return (
//     <div className="dashboard-wrapper">
//       <Sidebar />
//       <div className="dashboard-container">
//         {/* Top Section */}
//         <div className="test-score-section">
//           <h1>Test Results: {roundTitle}</h1>
//           <div className="score-box">
//             <div className="score-text">
//               <h2>{correct}/{totalQuestions}</h2>
//             </div>
//             <div className="score-info">
//               <div className="circular-bar">
//                 <svg>
//                   <circle className="circle-bg" cx="60" cy="60" r="54"></circle>
//                   <circle
//                     className="circle"
//                     cx="60"
//                     cy="60"
//                     r="54"
//                     strokeDasharray={339.292} // 2πr
//                     strokeDashoffset={339.292 - (339.292 * percentage) / 100}
//                   ></circle>
//                   <text x="60" y="65" className="percentage-text">
//                     {percentage}%
//                   </text>
//                 </svg>
//               </div>
//               <div className="score-info">
//                 <p>Correct: {correct}</p>
//                 <p>Wrong: {wrong}</p>
//                 <p>Unattempted: {unattempted}</p>
//                 <p>Time: {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Middle Section */}
//         <div className="main-content">
//           {/* Left: Analysis & Improvements */}
//           <div className="left-column">
//             <div className="analysis-section">
//               <h2>Analysis</h2>
//               {analysis.map((item, idx) => (
//                 <div className="progress-container" key={idx}>
//                   <span>{item.label}</span>
//                   <div className="progress-bar green">
//                     <div
//                       className="progress-fill"
//                       style={{ width: `${item.value}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="improvement-section">
//               <h2>Areas of Improvement</h2>
//               {improvements.length === 0 ? (
//                 <p>Great job! No weak topics detected.</p>
//               ) : (
//                 improvements.map((item, idx) => (
//                   <div className="progress-container" key={idx}>
//                     <span>{item.label}</span>
//                     <div className="progress-bar red">
//                       <div
//                         className="progress-fill"
//                         style={{ width: `${item.value}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))
//               )}
//               {improvements.length > 0 && (
//                 <button className="practice-weak-btn">
//                   Practice Weak Topics
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Right: Recommended Courses */}
//           <div className="right-column">
//             <div className="recommendation-section">
//               <h2>Recommended Courses</h2>
//               <div className="courses-grid">
//                 {recommendedCourses.length === 0 ? (
//                   <p>All topics covered!</p>
//                 ) : (
//                   recommendedCourses.map((course, idx) => (
//                     <div className="course-card" key={idx}>
//                       <span>{course.title}</span>
//                       <button>Watch</button>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section: Next Rounds */}
//         <div className="next-rounds-section">
//           <h2>Next Rounds to Attempt</h2>
//           <div className="rounds-grid">
//             {nextRounds.map((round, idx) => (
//               <div className="next-round-card" key={idx}>
//                 <span>{round.title}</span>
//                 <button>Start</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; 


// import Sidebar from "../components/Sidebar";
// import "../styles/Dashboard.css";

// const Dashboard = () => {
//   const [result, setResult] = useState(null);
//     const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

  

//   const handleWatchClick = () => {
//     navigate("/courses"); // redirect to courses page
//   };

  


//  useEffect(() => {
//   const lastResult = localStorage.getItem("lastTestResult");
//   if (lastResult) {
//     console.log("Loaded lastTestResult from localStorage:", JSON.parse(lastResult));
//     setResult(JSON.parse(lastResult));
//   }
//    fetch("/api/courses")
//       .then(res => res.json())
//       .then(data => setCourses(data))
//       .catch(err => console.error("Failed to fetch courses", err));
// }, []);
//   if (!result) return <p>Loading results...</p>;

//   const { roundTitle, totalQuestions, answers, timeTaken } = result;

//   // Calculate correct, wrong, unattempted dynamically
//   const answersArray = Object.values(answers || {});
//   const correct = answersArray.filter(a => a.isCorrect).length;
//   const attempted = answersArray.length;
//   const wrong = attempted - correct;
//   const unattempted = totalQuestions - attempted;
//   const percentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

//   // Analysis by topic
//   const topicStats = {};
//   answersArray.forEach(a => {
//     if (!topicStats[a.topic]) topicStats[a.topic] = { correct: 0, total: 0 };
//     topicStats[a.topic].total += 1;
//     if (a.isCorrect) topicStats[a.topic].correct += 1;
//   });

//   const analysis = Object.keys(topicStats).map(topic => ({
//     label: topic,
//     value: Math.round((topicStats[topic].correct / topicStats[topic].total) * 100)
//   }));

//   const improvements = Object.keys(topicStats)
//     .map(topic => ({
//       label: topic,
//       value: 100 - Math.round((topicStats[topic].correct / topicStats[topic].total) * 100)
//     }))
//     .filter(i => i.value > 0);

//   const recommendedCourses = improvements.map(i => ({ title: `Improve ${i.label}`, link: "#" }));
//   const nextRounds = [
//     { title: "Aptitude Round 2" },
//     { title: "Coding Round 1" },
//     { title: "HR Round 1" },
//   ];

//   const formatTime = sec => `${Math.floor(sec / 60)}m ${sec % 60}s`;

//   return (
//     <div className="dashboard-wrapper">
//       <Sidebar />
//       <div className="dashboard-container">
//         {/* Top Section */}
//         <div className="test-score-section">
//           <h1>Test Results: {roundTitle}</h1>
//           <div className="score-box">
//             <div className="score-text">
//               <h2>{correct}/{totalQuestions}</h2>
//             </div>
//             <div className="score-info">
//               <div className="circular-bar">
//                 <svg>
//                   <circle className="circle-bg" cx="60" cy="60" r="54"></circle>
//                   <circle
//                     className="circle"
//                     cx="60"
//                     cy="60"
//                     r="54"
//                     strokeDasharray={339.292}
//                     strokeDashoffset={339.292 - (339.292 * percentage) / 100}
//                   ></circle>
//                   <text x="60" y="65" className="percentage-text">{percentage}%</text>
//                 </svg>
//               </div>
//               <div className="score-info">
//                 <p>Correct: {correct}</p>
//                 <p>Wrong: {wrong}</p>
//                 <p>Unattempted: {unattempted}</p>
//                 <p>Time: {formatTime(timeTaken)}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Middle Section */}
//         <div className="main-content">
//           {/* Analysis */}
//           <div className="left-column">
//             <div className="analysis-section">
//               <h2>Analysis</h2>
//               {analysis.map((item, idx) => (
//                 <div className="progress-container" key={idx}>
//                   <span>{item.label}</span>
//                   <div className="progress-bar green">
//                     <div className="progress-fill" style={{ width: `${item.value}%` }}></div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="improvement-section">
//               <h2>Areas of Improvement</h2>
//               {improvements.length === 0 ? <p>Great job! No weak topics.</p> : improvements.map((item, idx) => (
//                 <div className="progress-container" key={idx}>
//                   <span>{item.label}</span>
//                   <div className="progress-bar red">
//                     <div className="progress-fill" style={{ width: `${item.value}%` }}></div>
//                   </div>
//                 </div>
//               ))}
//               {improvements.length > 0 && <button className="practice-weak-btn">Practice Weak Topics</button>}
//             </div>
//           </div>

//           {/* Recommended Courses */}
//           {/* <div className="right-column">
//             <div className="recommendation-section">
//               <h2>Recommended Courses</h2>
//               <div className="courses-grid">
//                 {recommendedCourses.length === 0 ? <p>All topics covered!</p> : recommendedCourses.map((course, idx) => (
//                   <div className="course-card" key={idx}>
//                     <span>{course.title}</span>
//                        <button onClick={handleWatchClick}>Watch</button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div> */}

           
//         <div className="recommendation-section">
//   <h2>Recommended Videos</h2>
//   <div className="videos-list">
//     {courses.length === 0 ? (
//       <p>No recommended courses.</p>
//     ) : (
//       courses.map(course => (
//         <div className="video-card" key={course._id} onClick={() => handleWatchClick(course._id)}>
//           <img src={course.image} alt={course.title} />
//           <div className="video-info">
//             <h4>{course.title}</h4>
//           </div>
//         </div>
//       ))
//     )}
//   </div>
// </div>




//         </div>

//         {/* Next Rounds */}
//         <div className="next-rounds-section">
//           <h2>Next Rounds to Attempt</h2>
//           <div className="rounds-grid">
//             {nextRounds.map((round, idx) => (
//               <div className="next-round-card" key={idx}>
//                 <span>{round.title}</span>
//                 <button>Start</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
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
