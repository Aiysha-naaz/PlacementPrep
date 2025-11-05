// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// // import "../styles/Curriculum.css";

// const Curriculum = () => {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
//         setCourse(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchCourse();
//   }, [id]);

//   if (!course) return <p style={{ color: "white", padding: "20px" }}>Loading...</p>;

//   return (
//     <div className="practice-wrapper">
//       <div className="practice-container">
//         <h1>{course.title}</h1>
//         <p>{course.description}</p>

//         <div className="round-cards-horizontal">
//           {course.lessons.map((lesson) => (
//             <div key={lesson._id} className="round-card">
//               <h3>{lesson.title}</h3>
//               <div className="topics-list">
//                 <span>{lesson.description}</span>
//               </div>
//               <a
//                 href={lesson.videoLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="start-btn"
//               >
//                 Watch Video
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default Curriculum;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// // import "../styles/Curriculum.css";

// const Curriculum = () => {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch course data
//   const fetchCourse = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
//       setCourse(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourse();
//   }, [id]);

//   // Toggle lesson completion
//   const toggleCompletion = async (topicIndex, lessonIndex) => {
//     const lesson = course.topics[topicIndex].lessons[lessonIndex];

//     try {
//       await axios.patch(
//         `http://localhost:5000/api/courses/${id}/lesson/${lesson._id}`,
//         { completed: !lesson.completed }
//       );

//       const updatedCourse = { ...course };
//       updatedCourse.topics[topicIndex].lessons[lessonIndex].completed = !lesson.completed;
//       setCourse(updatedCourse);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (loading) return <p style={{ color: "white", padding: "20px" }}>Loading...</p>;
//   if (!course) return <p style={{ color: "white", padding: "20px" }}>Course not found</p>;

//   return (
//     <div className="practice-wrapper">
//       <div className="practice-container">
//         <h1>{course.title || "Untitled Course"}</h1>
//         <p>{course.description || "No description available"}</p>

//         {course.topics && course.topics.length > 0 ? (
//           course.topics.map((topic, tIndex) => {
//             const lessons = topic.lessons || [];
//             const completedCount = lessons.filter((l) => l.completed).length;
//             const totalLessons = lessons.length;

//             return (
//               <div key={tIndex} className="round-card" style={{ marginBottom: "20px" }}>
//                 <h3>{topic.title || "Untitled Topic"}</h3>
//                 <p style={{ color: "#aaa", marginBottom: "10px" }}>
//                   {completedCount} / {totalLessons} lessons completed
//                 </p>

//                 {lessons.length > 0 ? (
//                   <div className="round-cards-horizontal">
//                     {lessons.map((lesson, lIndex) => (
//                       <div key={lIndex} className="round-card" style={{ minWidth: "200px" }}>
//                         <h4>{lesson.title || "Untitled Lesson"}</h4>
//                         <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "10px" }}>
//                           {lesson.description || "No description"}
//                         </p>
//                         <button
//                           className="start-btn"
//                           style={{ background: lesson.completed ? "#22c55e" : "#6366f1" }}
//                           onClick={() => toggleCompletion(tIndex, lIndex)}
//                         >
//                           {lesson.completed ? "Completed" : "Mark as Complete"}
//                         </button>
//                         {lesson.videoLink && (
//                           <a
//                             href={lesson.videoLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="start-btn"
//                             style={{ marginTop: "8px" }}
//                           >
//                             Watch Video
//                           </a>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p style={{ color: "#aaa", marginTop: "10px" }}>No lessons available</p>
//                 )}
//               </div>
//             );
//           })
//         ) : (
//           <p style={{ color: "#aaa", marginTop: "20px" }}>No topics available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Curriculum;













// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../styles/Curriculum.css";

// const Curriculum = () => {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
//         setCourse(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchCourse();
//   }, [id]);

//   const markComplete = (topicIndex, lessonIndex) => {
//   const updatedCourse = { ...course };
//   updatedCourse.topics[topicIndex].lessons[lessonIndex].completed = true;
//   setCourse(updatedCourse);

//   const lessonId = updatedCourse.topics[topicIndex].lessons[lessonIndex]._id;

//   axios.patch(`http://localhost:5000/api/courses/${id}/lesson/${lessonId}`, {
//     completed: true,
//   });
// };


//   if (!course) return <p>Loading...</p>;

//   return (
//     <div className="curriculum-wrapper">
//       <h1>{course.title}</h1>
//       {course.topics.map((topic, tIndex) => {
//         const totalLessons = topic.lessons.length;
//         const completedLessons = topic.lessons.filter(l => l.completed).length;
//         const progress = totalLessons ? (completedLessons / totalLessons) * 100 : 0;

//         return (
//           <div key={topic._id} className="topic-section">
//             <h2>{topic.title}</h2>

//             {/* Topic-level progress bar */}
//             <div className="topic-progress">
//               <div className="topic-progress-bar">
//                 <div className="topic-progress-fill" style={{ width: `${progress}%` }}></div>
//               </div>
//               <span>{completedLessons}/{totalLessons} Lessons Completed</span>
//             </div>

//             {/* Horizontal lessons container */}
//             <div className="lessons-horizontal">
//   {topic.lessons.map((lesson, lIndex) => (
//     <div key={lesson._id} className="lesson-row">
//       <div className="lesson-info">
//         <h3>{lesson.title}</h3>
//         <p>{lesson.description}</p>
//       </div>
//       <div className="lesson-actions">
//         <button onClick={() => markComplete(tIndex, lIndex)}>
//           {lesson.completed ? "Completed" : "Mark as Complete"}
//         </button>
//         <a href={lesson.videoLink} target="_blank" rel="noopener noreferrer">
//           <button>Watch Video</button>
//         </a>
//       </div>
//     </div>
//   ))}
// </div>

//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Curriculum;


// Curriculum.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Curriculum.css";

const ProgressBar = ({ completedPercent }) => (
  <div className="progress-bar-container">
    <div
      className="progress-bar-fill"
      style={{ width: `${completedPercent}%` }}
    />
    <span className="progress-label">{`${completedPercent.toFixed(0)}%`}</span>
  </div>
);

const Curriculum = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCourse();
  }, [id]);

  const markComplete = (topicIndex, lessonIndex) => {
    const updatedCourse = { ...course };
    updatedCourse.topics[topicIndex].lessons[lessonIndex].completed = true;
    setCourse(updatedCourse);

    const lessonId = updatedCourse.topics[topicIndex].lessons[lessonIndex]._id;
    axios.patch(`http://localhost:5000/api/courses/${id}/lesson/${lessonId}`, {
      completed: true,
    });
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="curriculum-wrapper">
      <h1>{course.title}</h1>
      {course.topics.map((topic, tIndex) => {
        const totalLessons = topic.lessons.length;
        const completedLessons = topic.lessons.filter((l) => l.completed).length;
        const progress = totalLessons
          ? (completedLessons / totalLessons) * 100
          : 0;

        return (
          <div key={topic._id} className="topic-section">
            <h2>{topic.title}</h2>
            <ProgressBar completedPercent={progress} />
            <span className="lesson-count">
              {completedLessons}/{totalLessons} Lessons Completed
            </span>

            <div className="lessons-horizontal">
              {topic.lessons.map((lesson, lIndex) => (
                <div key={lesson._id} className="lesson-row">
                  <div className="lesson-info">
                    <h3>{lesson.title}</h3>
                    <p>{lesson.description}</p>
                  </div>
                  <div className="lesson-actions">
                    <button onClick={() => markComplete(tIndex, lIndex)}>
                      {lesson.completed ? "Completed" : "Mark as Complete"}
                    </button>
                    <a
                      href={lesson.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                     <button
  className="watch-btn"
  onClick={() => (window.location.href = lesson.videoLink)}
>
  Watch Video
</button>

                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Curriculum;
