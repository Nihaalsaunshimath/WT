import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const AppHeader = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">Your Website Name</h1>
      <nav>
        <ul className="nav-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/changes">Changes</Link></li>
        </ul>
      </nav>
    </header>
  );
};