import React from "react";
import "./Navbar.css";

const Navbar = ({ dark, searchTerm, setSearchTerm, toggleDarkMode }) => {
  return (
    <nav className={`nav ${dark ? "dark" : ""}`}>
      <div className="left-nav">
        <span className="logo">My Notes</span>
      </div>

      <input
        className="nav-search"
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="right-nav">
        <span className="nav-item">Home</span>
        <span className="nav-item">List of Notes</span>
        <span className="nav-item">About Us</span>

        {/* Dark Mode Toggle */}
        <button className="dark-toggle" onClick={toggleDarkMode}>
          {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;