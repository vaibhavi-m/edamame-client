import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthApi, TokenApi, UserApi } from "../App";
import Cookies from "js-cookie";
import "./Dashboard.css";

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthApi);
  const { setToken } = useContext(TokenApi);
  const { setUser } = useContext(UserApi);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    setToken("");
    setUser(null);
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <nav className="dashboard-nav">
      <div className="nav-links">
        <Link to="/" className="nav-link home-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        {auth && <Link to="/contact" className="nav-link">Contact Us</Link>}
      </div>
      <div>
        {auth ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Dashboard;