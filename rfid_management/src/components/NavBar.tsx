import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css"; 

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Rfdi Attendance app</div>
      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Home
        </NavLink>
        <NavLink
          to="/attendance"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Attendance
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
