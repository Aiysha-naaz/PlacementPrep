// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/Courses.css"; // optional styling

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/courses");

//         setCourses(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div>
//       <h1>Courses</h1>
//       <div className="courses-container">
//         {courses.map((course) => (
//           <div
//             key={course._id}
//             className="course-card"
//             onClick={() => navigate(`/courses/${course._id}`)}
//             style={{ cursor: "pointer" }}
//           >
//             <img src={course.image} alt={course.title} />
//             <h2>{course.title}</h2>
//             <p>{course.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Courses;








// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/Courses.css"; // make sure this CSS exists

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         // Use full URL if proxy not set
//         const res = await axios.get("http://localhost:5000/api/courses");
//         console.log(res.data); // check if courses come
//         setCourses(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (!courses.length) {
//     return (
//       <div className="practice-wrapper">
//         <div className="practice-container">
//           <h1>All Courses</h1>
//           <p>No courses found!</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="practice-wrapper">
//       <div className="practice-container">
//         <h1>All Courses</h1>
//         <p>Click on a course to see its curriculum and progress.</p>

//         <div className="round-cards-horizontal">
//           {courses.map((course) => (
//             <div
//               key={course._id}
//               className="round-card"
//               onClick={() => navigate(`/courses/${course._id}`)}
//             >
//               <img
//                 src={course.image}
//                 alt={course.title}
//                 style={{
//                   width: "100%",
//                   borderRadius: "12px",
//                   marginBottom: "15px",
//                   objectFit: "cover",
//                   height: "150px",
//                 }}
//               />
//               <h3>{course.title}</h3>
//               <div className="topics-list">
//                 <span>{course.description}</span>
//               </div>
//               <button className="start-btn">View Course</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/Courses.css";

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/courses");
//         setCourses(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (!courses.length)
//     return (
//       <div className="practice-wrapper">
//         <div className="practice-container">
//           <h1>Courses</h1>
//           <p>No courses available</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="practice-wrapper">
//       <div className="practice-container">
//         <h1>All Courses</h1>
//         <div className="round-cards-horizontal">
//           {courses.map((course) => (
//             <div
//               key={course._id}
//               className="round-card"
//               onClick={() => navigate(`/courses/${course._id}`)}
//             >
//               <img
//                 src={course.image}
//                 alt={course.title}
//                 style={{
//                   width: "100%",
//                   borderRadius: "12px",
//                   marginBottom: "15px",
//                   objectFit: "cover",
//                   height: "150px",
//                 }}
//               />
//               <h3>{course.title}</h3>
//               <div className="topics-list">
//                 <span>{course.description}</span>
//               </div>
//               <button className="start-btn">View Course</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default Courses;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/Courses.css";

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get("/api/courses"); // make sure backend includes topics
//         setCourses(res.data);
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//       }
//     };
//     fetchCourses();
//   }, []);

//   if (!courses.length)
//     return (
//       <div className="practice-wrapper">
//         <div className="practice-container">
//           <h1>Courses</h1>
//           <p>No courses available</p>
//         </div>
//       </div>
//     );

//   // Helper function to count completed lessons
//   const getProgress = (course) => {
//     let completed = 0;
//     let total = 0;
//     course.topics.forEach((topic) => {
//       topic.lessons.forEach((lesson) => {
//         total += 1;
//         if (lesson.completed) completed += 1;
//       });
//     });
//     return { completed, total };
//   };

//   return (
//     <div className="practice-wrapper">
//       <div className="practice-container">
//         <h1>All Courses</h1>
//         <div className="round-cards-horizontal">
//           {courses.map((course) => {
//             const { completed, total } = getProgress(course);

//             return (
//               <div
//                 key={course._id}
//                 className="round-card"
//                 onClick={() => navigate(`/courses/${course._id}`)}
//               >
//                 <img
//                   src={course.image}
//                   alt={course.title}
//                   style={{
//                     width: "100%",
//                     borderRadius: "12px",
//                     marginBottom: "15px",
//                     objectFit: "cover",
//                     height: "150px",
//                   }}
//                 />
//                 <h3>{course.title}</h3>
//                 <div className="topics-list">
//                   <span>{course.description}</span>
//                   <span style={{ fontSize: "0.85rem", color: "#aaa" }}>
//                     {completed}/{total} Lessons Completed
//                   </span>
//                 </div>
//                 <button className="start-btn">View Course</button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;








// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/Courses.css";

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/courses");
//         setCourses(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (!courses.length) {
//     return (
//       <div className="practice-wrapper">
//         <div className="practice-container">
//           <h1>Courses</h1>
//           <p>No courses available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="practice-wrapper">
//       <div className="practice-container">
//         <h1>All Courses</h1>
//         <div className="round-cards-horizontal">
//           {courses.map((course) => (
//             <div
//               key={course._id}
//               className="round-card"
//               onClick={() => navigate(`/courses/${course._id}`)}
//               style={{ cursor: "pointer" }}
//             >
//               <img
//                 src={course.image}
//                 alt={course.title}
//                 style={{
//                   width: "100%",
//                   borderRadius: "12px",
//                   marginBottom: "15px",
//                   objectFit: "cover",
//                   height: "150px",
//                 }}
//               />
//               <h3>{course.title}</h3>
//               <p>{course.description}</p>
//               <button className="start-btn">View Course</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/Courses.css";

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/courses");
//         setCourses(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const filteredCourses = courses.filter(course =>
//     course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     course.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="practice-wrapper">
//       <div className="practice-container">
//         <h1>All Courses</h1>
//         <p>Explore our comprehensive collection of courses designed to boost your skills.</p>

//         <input
//           type="text"
//           placeholder="Search courses..."
//           className="search-bar"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           aria-label="Search courses"
//         />

//         {!filteredCourses.length ? (
//           <p className="no-results">No courses match your search.</p>
//         ) : (
//           <div className="round-cards-horizontal">
//             {filteredCourses.map((course) => (
//               <div
//                 key={course._id}
//                 className="round-card"
//                 onClick={() => navigate(`/courses/${course._id}`)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <img
//                   src={course.image}
//                   alt={course.title}
//                   style={{
//                     width: "100%",
//                     borderRadius: "12px",
//                     marginBottom: "15px",
//                     objectFit: "cover",
//                     height: "150px",
//                   }}
//                 />
//                 <h3>{course.title}</h3>
//                 <p>{course.description}</p>
//                 <button className="start-btn">View Course</button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Courses;
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
