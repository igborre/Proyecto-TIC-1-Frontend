import React, { useState } from "react";
import axiosInstance from "../Utils/AxiosConfig";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir
import "./LogIn.css"; // Asegúrate de tener el archivo CSS correspondiente

const LogIn = ({ onLogIn }) => {
  // Configurar la URL base para Axios

  // Estados para el correo electrónico y la contraseña
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Inicializar useNavigate

  // Función para manejar el inicio de sesión con email
  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/users/login", {
        username,
        password,
      });
      console.log("Login successful:", response.data);
      onLogIn(); // Si hay un callback para manejar el inicio de sesión
      navigate("/reserva"); // Redirigir a la página de reserva
    } catch (error) {
      console.error("Error during username login:", error);
    }
  };

  return (
    <div className="LogIn-container">
      <div className="username-login-form">
        <h2>Log In</h2>
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="LogIn-buttons">
          Login
        </button>
      </div>
    </div>
  );
};

export default LogIn;
