import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthApi } from "../App";
import "./Contact.css";

const Contact = () => {
  const { auth } = useContext(AuthApi);
  
  if (!auth) return <Navigate to="/login" />;

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p className="contact-info">Email us at: support@example.com</p>
      <p className="contact-info">Call us at: 1-800-123-4567</p>
    </div>
  );
};

export default Contact;