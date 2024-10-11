import React, { useState } from "react";
import "./SignUp.css";
import Auth from "../Utils/Auth";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir
import axiosInstance from "../Utils/AxiosConfig";

const SignUp = ({ onLogIn }) => {
  const { getData } = Auth();
  const navigate = useNavigate(); // Inicializar useNavigate para la redirección

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        console.log(formData);
        const response = await axiosInstance.post(
          "/api/v1/users/register",
          formData // Send the form data directly
        );

        if (response.status === 200 || response.status === 201) {
          // Assuming 200 or 201 for success
          const data = response.data;
          console.log("Sign up successful:", data);
          getData(data); // Update user data
          onLogIn();
          navigate("/reserva"); // Redirect to reservations
        } else {
          console.error(
            "Error signing up:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error);
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className="SignUp-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
