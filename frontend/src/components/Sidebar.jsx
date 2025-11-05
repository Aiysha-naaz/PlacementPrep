// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Placement Portal</h2>
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>
        {/* <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
          Login
        </NavLink>
        <NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""}>
          Register
        </NavLink> */}
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
          Dashboard
        </NavLink>
        <NavLink to="/interview" className={({ isActive }) => isActive ? "active" : ""}>
          Interview
        </NavLink>
          <NavLink to="/practice" className="sidebar-link">
          Practice
        </NavLink>
        <NavLink to="/courses" className="sidebar-link">
          Courses
        </NavLink>
         <NavLink to="/resume" className="sidebar-link">
          Resume
        </NavLink>
      </nav>
    </div>
  );
}

export default sidebar;
