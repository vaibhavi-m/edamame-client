import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Result from "./pages/Result"
import "./App.css";

// Global Contexts
export const AuthApi = createContext();
export const TokenApi = createContext();
export const UserApi = createContext();

function App() {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = Cookies.get("token");
      if (storedToken) {
        try {
          const response = await axios.get("http://localhost:8000/", {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          setAuth(true);
          setToken(storedToken);
          setUser(response.data.user_info);
        } catch (error) {
          Cookies.remove("token");
        }
      }
    };
    verifySession();
  }, []);

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <TokenApi.Provider value={{ token, setToken }}>
        <UserApi.Provider value={{ user, setUser }}>
          <Router>
            <div className="app-container">
              <Dashboard />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dataset/:datasetId" element={<Result />} />
              </Routes>
            </div>
          </Router>
        </UserApi.Provider>
      </TokenApi.Provider>
    </AuthApi.Provider>
  );
}

export default App;