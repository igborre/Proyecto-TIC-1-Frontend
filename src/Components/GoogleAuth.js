import React, { useState } from "react";
import axios from "axios";
import "./GoogleAuth.css"; // Importa tu CSS para GoogleAuth

const GoogleAuth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("/auth/google", {
                email,
                password,
            });
            // Maneja la respuesta del servidor (almacena el token, redirige, etc.)
            console.log(response.data);
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    return (
        <div className="google-auth-container">
            <h2>Log In with Google</h2>
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
            <button onClick={handleLogin} className="google-auth-button">
                Login
            </button>
        </div>
    );
};

export default GoogleAuth;


