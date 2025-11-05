




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
