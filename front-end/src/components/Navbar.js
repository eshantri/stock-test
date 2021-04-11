import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h1>Quikie Apps</h1>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/saved">
          <li>Saved Data</li>
        </Link>
      </ul>
    </nav>
  );
}
