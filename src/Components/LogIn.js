import "./LogIn.css";
import React from "react";
import axios from "axios";

const LogIn = ({ onLogIn }) => {
  axios.defaults.baseURL = "http://localhost:8080";

  const handleGithubLogin = async () => {
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
      <button onClick={handleGithubLogin} className="LogIn-buttons">
        Login with Google
      </button>
      <button onClick={onLogIn} className="LogIn-buttons">
        Hola
      </button>
    </div>
  );
};

export default LogIn;
