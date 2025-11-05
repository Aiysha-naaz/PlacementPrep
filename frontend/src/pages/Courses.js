
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="practice-wrapper">
      <div className="practice-container">
        <h1>All Courses</h1>
        <p className="intro-text">
          Explore our comprehensive collection of courses designed to boost your skills and accelerate your career.
        </p>

        <input
          type="text"
          placeholder="Search courses..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search courses"
        />

        {!filteredCourses.length ? (
          <p className="no-results">No courses match your search.</p>
        ) : (
          <div className="round-cards-horizontal">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="round-card"
                onClick={() => navigate(`/courses/${course._id}`)}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="course-image"
                />
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button className="start-btn">View Course</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
