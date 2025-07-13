import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthApi, TokenApi, UserApi } from "../App";
import axios from "axios";
import Cookies from "js-cookie";
import "./Login.css";

const Login = () => {
  const { auth, setAuth } = useContext(AuthApi);
  const { setToken } = useContext(TokenApi);
  const { setUser } = useContext(UserApi);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = new URLSearchParams();
      form.append("username", formData.username);
      form.append("password", formData.password);

      const response = await axios.post(
        "http://localhost:8000/login",
        form,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      Cookies.set("token", response.data.access_token, { expires: 1 });
      setAuth(true);
      setToken(response.data.access_token);
      setUser(response.data.user_info);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Processing..." : "Login"}
        </button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;