import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir
import "./LogIn.css"; // Asegúrate de tener el archivo CSS correspondiente

const LogIn = ({ onLogIn }) => {
    // Configurar la URL base para Axios
    axios.defaults.baseURL = "http://localhost:8080";

    // Estados para el correo electrónico y la contraseña
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Inicializar useNavigate

    // Función para manejar el inicio de sesión con email
    const handleEmailLogin = async () => {
        try {
            const response = await axios.post("/auth/email", { email, password }); // Ajusta la ruta según tu backend
            console.log("Login successful:", response.data);
            onLogIn(); // Si hay un callback para manejar el inicio de sesión
            navigate("/reserva"); // Redirigir a la página de reserva
        } catch (error) {
            console.error("Error during email login:", error);
        }
    };

    return (
        <div className="LogIn-container">
            <div className="email-login-form">
                <h2>Log In with Email</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleEmailLogin} className="LogIn-buttons">
                    Login
                </button>
            </div>
        </div>
    );
};

export default LogIn;





