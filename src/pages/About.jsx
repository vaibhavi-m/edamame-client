import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthApi } from "../App";
import "./About.css";

const About = () => {
  const { auth } = useContext(AuthApi);

  if (!auth) return <Navigate to="/login" />;

  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>This is a demo application showcasing React authentication with a backend API.</p>
      <p>Features include:</p>
      <ul className="features-list">
        <li>User registration and login</li>
        <li>Protected routes</li>
        <li>JWT token authentication</li>
        <li>Persistent sessions</li>
      </ul>
    </div>
  );
};

export default About;