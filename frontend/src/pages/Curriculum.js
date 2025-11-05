


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
