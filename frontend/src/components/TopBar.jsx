// import React, { useState, useEffect } from "react";
// import { FaBell, FaUserCircle } from "react-icons/fa";
// import "../styles/TopBar.css";

// const TopBar = () => {
//   const [showRightSidebar, setShowRightSidebar] = useState(false);
//   const [activeTab, setActiveTab] = useState("profile");
//   const [user, setUser] = useState({ name: "User", email: "user@example.com" });
//   const [notifications, setNotifications] = useState([
//     "Interview scheduled",
//     "Mock test completed",
//     "New course added",
//   ]);

//   // Get logged-in user from localStorage
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);
//   }, []);

//   return (
//     <div>
//       {/* Top right icons */}
//       <div className="topbar-icons">
//         <FaBell
//           size={24}
//           onClick={() => {
//             setActiveTab("notifications");
//             setShowRightSidebar(true);
//           }}
//         />
//         <FaUserCircle
//           size={28}
//           onClick={() => {
//             setActiveTab("profile");
//             setShowRightSidebar(true);
//           }}
//         />
//       </div>

//       {/* Right Sidebar */}
//       {showRightSidebar && (
//         <div className="right-sidebar">
//           <button onClick={() => setShowRightSidebar(false)}>Close</button>

//           {activeTab === "profile" && (
//             <div>
//               <div className="profile-section">
//                 <FaUserCircle />
//                 <div>
//                   <p>{user.name}</p>
//                   <p>{user.email}</p>
//                 </div>
//               </div>
//               <hr />
//               <p>Profile settings...</p>
//             </div>
//           )}

//           {activeTab === "notifications" && (
//             <div>
//               <h3>Notifications</h3>
//               <ul>
//                 {notifications.map((note, i) => (
//                   <li key={i}>{note}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TopBar;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaTimes } from "react-icons/fa";
import "../styles/TopBar.css";

const TopBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    // Example notifications: calculate days until interview
    if (storedUser) {
      const interviews = JSON.parse(localStorage.getItem("interviews")) || [];
      const userInterviews = interviews.filter(
        (i) => i.applicants?.find(a => a.user === storedUser._id)
      );

      const today = new Date();
      const notifs = userInterviews
        .map(i => {
          const diffDays = Math.ceil((new Date(i.date) - today) / (1000 * 60 * 60 * 24));
          if (diffDays > 0)
            return `${storedUser.name}, you have an interview in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
          return null;
        })
        .filter(Boolean);

      setNotifications(notifs.length ? notifs : ["No upcoming interviews"]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="topbar">
      <FaBell className="topbar-icon" onClick={() => setShowSidebar(true)} />
      <FaUserCircle className="topbar-icon" onClick={() => setShowSidebar(true)} />

      <div className={`right-sidebar ${showSidebar ? "open" : ""}`}>
        <FaTimes className="close-btn" onClick={() => setShowSidebar(false)} />
        <div className="user-info">
          <div className="profile-icon">
            <FaUserCircle />
          </div>
          <div>
            <span>{user?.name || "User Name"}</span>
            <span>{user?.email || "user@example.com"}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>

        <h4>Notifications</h4>
        <div className="notifications">
          {notifications.map((n, idx) => (
            <p key={idx}>{n}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
