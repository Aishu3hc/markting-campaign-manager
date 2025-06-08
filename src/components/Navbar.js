import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Campaign Manager</h2>
      </div>
      <ul className="navbar-links">
      
        <li>
          <Link to="/" className="navbar-link">Dashboard</Link>
        </li>
        <li>
          <Link to="/campaigns" className="navbar-link">Campaigns</Link>
        </li>
        <li>
          <Link to="/shopping" className="navbar-link">Shopping</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
