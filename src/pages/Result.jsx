import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { AuthApi, TokenApi } from "../App";
import axios from "axios";

const Result = () => {
  const { auth } = useContext(AuthApi);
  const { token } = useContext(TokenApi);
  const { datasetId } = useParams();
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) return;

    const fetchDataset = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(`http://localhost:8000/datasets/${datasetId}`, { headers });
        setDataset(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.detail || err.message);
        setLoading(false);
      }
    };
    fetchDataset();
  }, [auth, token, datasetId]);

  if (!auth) return <Navigate to="/login" />;

  return (
    <div className="dataset-result-container">
      {loading ? (
        <p>Loading dataset...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : dataset ? (
        <>
          <h2>{dataset.name}</h2>
          <p>Uploaded: {new Date(dataset.created_at).toLocaleDateString()}</p>
          {/* Add your dataset visualization/processing here */}
          <div className="dataset-preview">
            {/* This would display your dataset content */}
            <p>Dataset content would be displayed here</p>
          </div>
        </>
      ) : (
        <p>Dataset not found</p>
      )}
    </div>
  );
};

export default Result;