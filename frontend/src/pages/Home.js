// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/Home.css";  // import from styles folder

// function Home() {
//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <div className="hero">
//         <h1>Welcome to Placement Preparation Portal</h1>
//         <p>Prepare, Practice, and Get Placed!</p>
//         <div className="buttons">
//           <Link to="/login" className="btn">Login</Link>
//           <Link to="/register" className="btn">Register</Link>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="features">
//         <div className="feature-card">
//           <h3>Interviews</h3>
//           <p>Track upcoming & completed interviews</p>
//         </div>
//         <div className="feature-card">
//           <h3>Practice Rounds</h3>
//           <p>Aptitude, Coding, HR & Behavioural</p>
//         </div>
//         <div className="feature-card">
//           <h3>Dashboard</h3>
//           <p>View results, scores, and analysis</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero fade-in">
        <h1>Welcome to Placement Preparation Portal</h1>
        <p>Prepare, Practice, and Get Placed!</p>
        <div className="buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="features fade-in">
        <div className="feature-card">
          <div className="feature-icon" role="img" aria-label="Briefcase">💼</div>
          <h3>Interviews</h3>
          <p>Track upcoming & completed interviews with ease.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" role="img" aria-label="Laptop">💻</div>
          <h3>Practice Rounds</h3>
          <p>Aptitude, Coding, HR & Behavioural rounds to boost your skills.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" role="img" aria-label="Dashboard">📊</div>
          <h3>Dashboard</h3>
          <p>View results, scores, and detailed performance analysis.</p>
        </div>
      </div>

      {/* About Section */}
      <div className="about fade-in">
        <h2>Why Choose Us?</h2>
        <p>
          Our Placement Preparation Portal is designed to give you a seamless and structured approach to your job search.
          From personalized practice rounds to tracking interview schedules and performance analytics, we have everything you
          need to succeed.
        </p>
      </div>
    </div>
  );
}

export default Home;
