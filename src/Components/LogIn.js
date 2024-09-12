import "../App.css";
import React from "react";
import axios from "axios";

const LogIn = () => {
  axios.defaults.baseURL = "http://localhost:8081";
  const handleGitHubLogin = async () => {
    try {
      // Make a request to the backend server to initiate the Google OAuth2 flow
      const response = await axios.get("/auth/github");
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error("Error initiating Google login:", error);
    }
  };

  return (
    <div>
      <h1>Titulo LogIn</h1>
      <button onClick={handleGitHubLogin} className="login-button"></button>
    </div>
  );
};

export default LogIn;
