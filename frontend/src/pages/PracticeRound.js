// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import "../styles/PracticeRound.css";

// const PracticeRound = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [round, setRound] = useState(null);
//   const [currentQ, setCurrentQ] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 mins
//   const [attempts] = useState(3);

//   const roundsData = [
//     {
//       id: 1,
//       title: "Aptitude Round",
//       questions: Array.from({ length: 20 }, (_, i) => ({
//         id: i + 1,
//         q: `Sample Question ${i + 1}`,
//         options: ["Option A", "Option B", "Option C", "Option D"],
//       })),
//     },
//   ];

//   useEffect(() => {
//     const selected = roundsData.find((r) => r.id === parseInt(id));
//     if (!selected) return navigate("/practice");
//     setRound(selected);
//   }, [id, navigate]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   if (!round) return <p>Loading...</p>;

//   const handleAnswer = (qId, option) => {
//     setAnswers({ ...answers, [qId]: option });
//   };

//   const handleSubmit = () => {
//     alert("Test submitted!");
//     navigate("/practice");
//   };

//   const formatTime = (sec) => {
//     const m = Math.floor(sec / 60).toString().padStart(2, "0");
//     const s = (sec % 60).toString().padStart(2, "0");
//     return { min: m, sec: s };
//   };

//   const currentQuestion = round.questions[currentQ];
//   const { min, sec } = formatTime(timeLeft);

//   return (
//     <div className="practice-round-wrapper">
//       <Sidebar />
//       <div className="practice-round-container">

//         {/* Header */}
//         <div className="round-header">
//           <h1>{round.title}</h1>
//           <button className="end-test-btn" onClick={handleSubmit}>End Test</button>
//         </div>

//         <div className="practice-grid">
//           {/* Left - Question Numbers */}
//           <div className="question-nav-left">
//             <div className="numbers-grid">
//               {round.questions.map((q) => (
//                 <button
//                   key={q.id}
//                   className={`q-number 
//                     ${currentQ === q.id - 1 ? "current" : ""} 
//                     ${answers[q.id] ? "answered" : ""}`}
//                   onClick={() => setCurrentQ(q.id - 1)}
//                 >
//                   {q.id}
//                 </button>
//               ))}
//             </div>
//             <p className="question-info">
//               Question {currentQuestion.id} of {round.questions.length}
//             </p>
//           </div>

//           {/* Middle - Question & Options */}
//           <div className="question-middle">
//             <h3 className="question-text">{currentQuestion.q}</h3>
//             <ul className="options-list">
//               {currentQuestion.options.map((opt, idx) => (
//                 <li key={idx} className="option-item">
//                   <label>
//                     <input
//                       type="radio"
//                       name={`q${currentQuestion.id}`}
//                       value={opt}
//                       checked={answers[currentQuestion.id] === opt}
//                       onChange={() => handleAnswer(currentQuestion.id, opt)}
//                     />
//                     {opt}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Right - Info Panel */}
//           <div className="info-right">
//             <div className="timer-box">
//               <p>Time Left</p>
//               <div className="time-values">
//                 <div className="time-box">{min} min</div>
//                 <div className="time-box">{sec} sec</div>
//               </div>
//             </div>

//             <div className="attempts-progress">
//               <p>Attempted: {Object.keys(answers).length} / {round.questions.length}</p>
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ width: `${(Object.keys(answers).length / round.questions.length) * 100}%` }}
//                 ></div>
//               </div>
//             </div>

//             <button className="submit-btn" onClick={handleSubmit}>
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PracticeRound;







// // PracticeRound.js
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import "../styles/PracticeRound.css";

// const PracticeRound = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [round, setRound] = useState(null);
//   const [currentQ, setCurrentQ] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
//   const [attempts, setAttempts] = useState(3);

//   // Round data
//   useEffect(() => {
//     const roundsData = [
//       {
//         id: 1,
//         title: "Aptitude Round",
//         questions: Array.from({ length: 20 }, (_, i) => ({
//           id: i + 1,
//           q: `Sample Question ${i + 1}`,
//           options: ["Option A", "Option B", "Option C", "Option D"],
//         })),
//       },
//     ];
//     const selected = roundsData.find((r) => r.id === parseInt(id));
//     if (!selected) return navigate("/practice");
//     setRound(selected);
//   }, [id, navigate]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   if (!round) return <p>Loading...</p>;

//   const currentQuestion = round.questions[currentQ];

//   const handleAnswer = (qId, option) => {
//     setAnswers({ ...answers, [qId]: option });
//   };

//   const handleSubmit = () => {
//     alert("Test submitted!");
//     navigate("/practice");
//   };

//   const formatTime = (sec) => {
//     const m = Math.floor(sec / 60).toString().padStart(2, "0");
//     const s = (sec % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   const progressPercent = Math.floor(
//     (Object.keys(answers).length / round.questions.length) * 100
//   );

//   return (
//     <div className="practice-round-wrapper">
//       <Sidebar />

//       <div className="practice-round-container">
//         {/* Header */}
//         <div className="round-header">
//           <h1>{round.title}</h1>
//           <button className="end-test-btn" onClick={handleSubmit}>
//             End Test
//           </button>
//         </div>

//         <div className="practice-grid">
//           {/* Left - Question Numbers */}
//           <div className="question-nav-left">
//             <div className="numbers-grid">
//               {round.questions.map((q) => (
//                 <button
//                   key={q.id}
//                   className={`q-number 
//                     ${currentQ === q.id - 1 ? "current" : ""} 
//                     ${answers[q.id] ? "answered" : ""}`}
//                   onClick={() => setCurrentQ(q.id - 1)}
//                 >
//                   {q.id}
//                 </button>
//               ))}
//             </div>
//             <p className="question-info">
//               Question {currentQuestion.id} of {round.questions.length}
//             </p>
//           </div>

//           {/* Middle - Question & Options */}
//           <div className="question-middle">
//             <h3 className="question-text">{currentQuestion.q}</h3>
//             <ul className="options-list">
//               {currentQuestion.options.map((opt, idx) => (
//                 <li
//                   key={idx}
//                   className={`option-item ${
//                     answers[currentQuestion.id] === opt ? "selected" : ""
//                   }`}
//                   onClick={() => handleAnswer(currentQuestion.id, opt)}
//                 >
//                   {opt}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Right - Info Panel */}
//           <div className="info-right">
//             <div className="timer-box">
//               <p><strong>Time Left</strong></p>
//               <div className="time-values">
//                 <div className="time-box">{Math.floor(timeLeft / 60)}m</div>
//                 <div className="time-box">{timeLeft % 60}s</div>
//               </div>
//             </div>

//             <div className="attempts-progress">
//               <p>Attempted {Object.keys(answers).length} of {round.questions.length}</p>
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ width: `${progressPercent}%` }}
//                 ></div>
//               </div>
//             </div>

//             <button className="submit-btn" onClick={handleSubmit}>
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PracticeRound;




// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import "../styles/PracticeRound.css";

// const PracticeRound = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [round, setRound] = useState(null);
//   const [currentQ, setCurrentQ] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
//   const [attempts, setAttempts] = useState(3);

//   // Load round data
//   useEffect(() => {
//     const roundsData = [
//       {
//         id: 1,
//         title: "Aptitude Round",
//         questions: Array.from({ length: 20 }, (_, i) => ({
//           id: i + 1,
//           q: `Sample Question ${i + 1}`,
//           options: ["Option A", "Option B", "Option C", "Option D"],
//         })),
//       },
//     ];
//     const selected = roundsData.find((r) => r.id === parseInt(id));
//     if (!selected) return navigate("/practice");
//     setRound(selected);
//   }, [id, navigate]);

//   // Timer
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   if (!round) return <p>Loading...</p>;

//   const currentQuestion = round.questions[currentQ];

//   const handleAnswer = (qId, option) => {
//     setAnswers({ ...answers, [qId]: option });
//   };

//   // Submit and redirect to Dashboard
//   const handleSubmit = () => {
//     // Prepare test result
//     const totalQuestions = round.questions.length;
//     const attempted = Object.keys(answers).length;
//     const correct = Math.floor(Math.random() * (attempted + 1)); // replace with actual logic
//     const wrong = attempted - correct;
//     const unattempted = totalQuestions - attempted;
//     const timeTaken = 20 * 60 - timeLeft;

//     const result = {
//       roundTitle: round.title,
//       totalQuestions,
//       correct,
//       wrong,
//       unattempted,
//       timeTaken, // in seconds
//     };

//     // Save result to localStorage
//     localStorage.setItem("lastTestResult", JSON.stringify(result));

//     // Redirect to Dashboard
//     navigate("/dashboard");
//   };

//   const formatTime = (sec) => {
//     const m = Math.floor(sec / 60).toString().padStart(2, "0");
//     const s = (sec % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   const progressPercent = Math.floor(
//     (Object.keys(answers).length / round.questions.length) * 100
//   );

//   return (
//     <div className="practice-round-wrapper">
//       <Sidebar />

//       <div className="practice-round-container">
//         {/* Header */}
//         <div className="round-header">
//           <h1>{round.title}</h1>
//           <button className="end-test-btn" onClick={handleSubmit}>
//             End Test
//           </button>
//         </div>

//         <div className="practice-grid">
//           {/* Left - Question Numbers */}
//           <div className="question-nav-left">
//             <div className="numbers-grid">
//               {round.questions.map((q) => (
//                 <button
//                   key={q.id}
//                   className={`q-number 
//                     ${currentQ === q.id - 1 ? "current" : ""} 
//                     ${answers[q.id] ? "answered" : ""}`}
//                   onClick={() => setCurrentQ(q.id - 1)}
//                 >
//                   {q.id}
//                 </button>
//               ))}
//             </div>
//             <p className="question-info">
//               Question {currentQuestion.id} of {round.questions.length}
//             </p>
//           </div>

//           {/* Middle - Question & Options */}
//           <div className="question-middle">
//             <h3 className="question-text">{currentQuestion.q}</h3>
//             <ul className="options-list">
//               {currentQuestion.options.map((opt, idx) => (
//                 <li
//                   key={idx}
//                   className={`option-item ${
//                     answers[currentQuestion.id] === opt ? "selected" : ""
//                   }`}
//                   onClick={() => handleAnswer(currentQuestion.id, opt)}
//                 >
//                   {opt}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Right - Info Panel */}
//           <div className="info-right">
//             <div className="timer-box">
//               <p><strong>Time Left</strong></p>
//               <div className="time-values">
//                 <div className="time-box">{Math.floor(timeLeft / 60)}m</div>
//                 <div className="time-box">{timeLeft % 60}s</div>
//               </div>
//             </div>

//             <div className="attempts-progress">
//               <p>Attempted {Object.keys(answers).length} of {round.questions.length}</p>
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ width: `${progressPercent}%` }}
//                 ></div>
//               </div>
//             </div>

//             <button className="submit-btn" onClick={handleSubmit}>
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PracticeRound;






// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import axios from "axios";
// import "../styles/PracticeRound.css";

// const PracticeRound = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [round, setRound] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [currentQ, setCurrentQ] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 mins

//   // Fetch questions from backend
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/questions?roundId=${id}`);
//         setQuestions(res.data);
//         setRound({ id, title: `Round ${id}` });
//       } catch (err) {
//         console.log(err);
//         navigate("/practice");
//       }
//     };
//     fetchQuestions();
//   }, [id, navigate]);

//   // Timer
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   if (!round || questions.length === 0) return <p>Loading...</p>;

//   const currentQuestion = questions[currentQ];

//   const handleAnswer = (qId, option) => {
//     setAnswers({ ...answers, [qId]: option });
//   };

//   const handleNext = () => {
//     if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
//   };

//   const handlePrev = () => {
//     if (currentQ > 0) setCurrentQ(currentQ - 1);
//   };

//   const handleSubmit = () => {
//     const totalQuestions = questions.length;
//     const attempted = Object.keys(answers).length;
//     const correct = questions.reduce(
//       (acc, q) => (answers[q._id] === q.correctAnswer ? acc + 1 : acc),
//       0
//     );
//     const wrong = attempted - correct;
//     const unattempted = totalQuestions - attempted;
//     const timeTaken = 20 * 60 - timeLeft;

//     const result = {
//       roundTitle: round.title,
//       totalQuestions,
//       correct,
//       wrong,
//       unattempted,
//       timeTaken,
//     };

//     localStorage.setItem("lastTestResult", JSON.stringify(result));
//     navigate("/dashboard");
//   };

//   const progressPercent = Math.floor((Object.keys(answers).length / questions.length) * 100);

//   return (
//     <div className="practice-round-wrapper">
//       <Sidebar />

//       <div className="practice-round-container">
//         <div className="round-header">
//           <h1>{round.title}</h1>
//           <button className="end-test-btn" onClick={handleSubmit}>
//             End Test
//           </button>
//         </div>

//         <div className="practice-grid">
//           {/* Question Navigation */}
//           <div className="question-nav-left">
//             <div className="numbers-grid">
//               {questions.map((q, idx) => (
//                 <button
//                   key={q._id}
//                   className={`q-number ${currentQ === idx ? "current" : ""} ${
//                     answers[q._id] ? "answered" : ""
//                   }`}
//                   onClick={() => setCurrentQ(idx)}
//                 >
//                   {idx + 1}
//                 </button>
//               ))}
//             </div>
//             <p>
//               Question {currentQ + 1} of {questions.length}
//             </p>
//           </div>

//           {/* Question & Options */}
//           <div className="question-middle">
//             <h3 className="question-text">{currentQuestion.q}</h3>
//             <ul className="options-list">
//               {currentQuestion.options.map((opt, idx) => (
//                 <li
//                   key={idx}
//                   className={`option-item ${
//                     answers[currentQuestion._id] === opt ? "selected" : ""
//                   }`}
//                   onClick={() => handleAnswer(currentQuestion._id, opt)}
//                 >
//                   {opt}
//                 </li>
//               ))}
//             </ul>

//             <div className="nav-buttons">
//               <button onClick={handlePrev} disabled={currentQ === 0}>
//                 Previous
//               </button>
//               <button onClick={handleNext} disabled={currentQ === questions.length - 1}>
//                 Next
//               </button>
//             </div>
//           </div>

//           {/* Info Panel */}
//           <div className="info-right">
//             <div className="timer-box">
//               <p>Time Left</p>
//               <div className="time-values">
//                 <div className="time-box">{Math.floor(timeLeft / 60)}m</div>
//                 <div className="time-box">{timeLeft % 60}s</div>
//               </div>
//             </div>

//             <div className="attempts-progress">
//               <p>
//                 Attempted {Object.keys(answers).length} of {questions.length}
//               </p>
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ width: `${progressPercent}%` }}
//                 ></div>
//               </div>
//             </div>

//             <button className="submit-btn" onClick={handleSubmit}>
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PracticeRound;





import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../styles/PracticeRound.css";

const PracticeRound = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [round, setRound] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(20 * 60);

  // Fetch questions from backend
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/questions?roundId=${id}`);
//         // Ensure questions have _id, topic, options, answer
//         const formatted = res.data.map((q, idx) => ({
//           _id: q._id || idx.toString(),
//           q: q.q,
//           options: q.options,
//           answer: q.answer,
//           topic: q.topic || "General",
//         }));
//         setQuestions(formatted);
//         setRound({ id, title: `Round ${id}` });
//       } catch (err) {
//         console.log(err);
//         navigate("/practice");
//       }
//     };
//     fetchQuestions();
//   }, [id, navigate]);



useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/questions?roundId=${id}`);
      console.log("Fetched questions:", res.data); // Inspect the data here
      const formatted = res.data.map((q, idx) => ({
  _id: q._id || idx.toString(),
  q: q.q,
  options: q.options,
  answer: q.correctAnswer,   // Use correctAnswer from backend data
  topic: q.topic || "General",
}));

      setQuestions(formatted);
      setRound({ id, title: `Round ${id}` });
    } catch (err) {
      console.log(err);
      navigate("/practice");
    }
  };
  fetchQuestions();
}, [id, navigate]);


  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!round || questions.length === 0) return <p>Loading...</p>;

  const currentQuestion = questions[currentQ];

  // Handle answer selection
  // In PracticeRound component, inside handleAnswer function
const handleAnswer = (qId, selectedOption) => {
  const question = questions.find(q => q._id === qId);
  if (!question) return;

  // Defensive checks for undefined before trim()
  const correctAnswer = question.answer ? question.answer.toString().trim().toLowerCase() : "";
  const selected = selectedOption ? selectedOption.toString().trim().toLowerCase() : "";

  const isCorrect = correctAnswer === selected;

  console.log("Checking answer correctness:");
  console.log("Question:", question.q);
  console.log("Correct answer:", question.answer);
  console.log("Selected option:", selectedOption);
  console.log("Is correct:", isCorrect);

  setAnswers(prev => ({
    ...prev,
    [qId]: {
      topic: question.topic,
      selected: selectedOption,
      isCorrect
    }
  }));
};



  // Submit test
  const handleSubmit = () => {
    const totalQuestions = questions.length;
    const attempted = Object.keys(answers).length;
    const correct = Object.values(answers).filter(a => a.isCorrect).length;
    const wrong = attempted - correct;
    const unattempted = totalQuestions - attempted;
    const timeTaken = 20 * 60 - timeLeft;

    const result = {
      roundTitle: round.title,
      totalQuestions,
      attempted,
      correct,
      wrong,
      unattempted,
      timeTaken,
      answers
    };

    // Save result to localStorage for Dashboard
    localStorage.setItem("lastTestResult", JSON.stringify(result));

    // Redirect to Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="practice-round-wrapper">
      <Sidebar />
      <div className="practice-round-container">
        <div className="round-header">
          <h1>{round.title}</h1>
          <button className="end-test-btn" onClick={handleSubmit}>End Test</button>
        </div>

        <div className="practice-grid">
          {/* Left - Question Numbers */}
          <div className="question-nav-left">
            <div className="numbers-grid">
              {questions.map((q, idx) => (
                <button
                  key={q._id}
                  className={`q-number ${currentQ === idx ? "current" : ""} ${answers[q._id] ? "answered" : ""}`}
                  onClick={() => setCurrentQ(idx)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <p className="question-info">
              Question {currentQ + 1} of {questions.length}
            </p>
          </div>

          {/* Middle - Question & Options */}
          <div className="question-middle">
            <h3 className="question-text">{currentQuestion.q}</h3>
            <ul className="options-list">
              {currentQuestion.options.map((opt, idx) => (
                <li
                  key={idx}
                  className={`option-item ${answers[currentQuestion._id]?.selected === opt ? "selected" : ""}`}
                  onClick={() => handleAnswer(currentQuestion._id, opt)}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Info Panel */}
          <div className="info-right">
            <div className="timer-box">
              <p><strong>Time Left</strong></p>
              <div className="time-values">
                <div className="time-box">{Math.floor(timeLeft / 60)}m</div>
                <div className="time-box">{timeLeft % 60}s</div>
              </div>
            </div>

            <div className="attempts-progress">
              <p>Attempted {Object.keys(answers).length} of {questions.length}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeRound;
