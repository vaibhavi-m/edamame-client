import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthApi, TokenApi, UserApi } from "../App";
import axios from "axios";
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
const Home = () => {
  const { auth } = useContext(AuthApi);
  const { token } = useContext(TokenApi);
  const { user } = useContext(UserApi);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [datasets, setDatasets] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!auth) return;

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get("http://localhost:8000/", { headers });
        setData(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.detail || err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [auth, token]);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    const newDataset = {
      id: Date.now(), // Temporary ID
      name: selectedFile.name,
      date: new Date().toLocaleDateString()
    };
    
    setDatasets([...datasets, newDataset]);
    setShowModal(false);
    setSelectedFile(null);
  };

  if (!auth) return <Navigate to="/login" />;

  return (
  <div className="home-container">
    <h2>My Projects</h2>
    
    <div className="datasets-grid">
      {datasets.map(dataset => (
        <div key={dataset.id} className="dataset-tile">  {/* Fixed class name */}
          <h3>{dataset.name}</h3>
          <p>Uploaded: {dataset.date}</p>
        </div>
      ))}
    </div>
    
    <button className="add-dataset-button" onClick={() => setShowModal(true)}>  {/* Fixed class name */}
      <FontAwesomeIcon icon={faSquarePlus} size="2x"/>
    </button>

    {/* Upload Modal */}
    {showModal && (
      <div className="modal-overlay">  {/* Fixed class name */}
        <div className="modal-content">  {/* Fixed class name */}
          <h3>Add Dataset</h3>
          <input 
            type="file" 
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
          />
          <div className="modal-buttons">
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={handleUpload} disabled={!selectedFile}>
              Upload
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default Home;

