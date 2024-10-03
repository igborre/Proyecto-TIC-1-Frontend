import React, { useState } from 'react';
import axios from 'axios';
import "./LogIn.css"; // Asegúrate de tener el archivo CSS correspondiente

const LogIn = ({ onLogIn }) => {
    // Configurar la URL base para Axios
    axios.defaults.baseURL = "http://localhost:8080";

    // Estado para mostrar el formulario de email
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleGoogleLogin = async () => {
        try {
            const response = await axios.get("/auth/google");
            window.location.href = response.data.redirectUrl;
        } catch (error) {
            console.error("Error initiating Google login:", error);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const response = await axios.get("/auth/facebook");
            window.location.href = response.data.redirectUrl;
        } catch (error) {
            console.error("Error initiating Facebook login:", error);
        }
    };

    const handleEmailLogin = async () => {
        try {
            const response = await axios.post("/auth/email", { email, password }); // Ajusta la ruta según tu backend
            console.log("Login successful:", response.data);
            onLogIn(); // Si hay un callback para manejar el inicio de sesión
        } catch (error) {
            console.error("Error during email login:", error);
        }
    };

    return (
        <div className="LogIn-container">
            <div className="LogIn-buttons-container">
                {showEmailForm ? ( // Condicional para mostrar el formulario de correo
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
                        <button onClick={() => setShowEmailForm(false)} className="LogIn-buttons">
                            Cancel
                        </button>
                    </div>
                ) : (
                    <>
                        <button onClick={handleGoogleLogin} className="LogIn-buttons">
                            Continue with Google
                        </button>
                        <button onClick={handleFacebookLogin} className="LogIn-buttons">
                            Continue with Facebook
                        </button>
                        <button onClick={() => setShowEmailForm(true)} className="LogIn-buttons">
                            Continue with Email
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default LogIn;




