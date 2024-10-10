import React from 'react';
import logo from "./logo.jpeg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Auth from './Utils/Auth';
import Reserva from './Components/Reserva'; // Asegúrate de tener el componente de Reserva

function App() {
    const { isLoggedIn, handleLogin, handleLogout } = Auth();

    return (
            <div className="App">
                <header className="App-header">
                    {/* Si el usuario está logueado, mostrar el botón de logout */}
                    {isLoggedIn ? (
                        <>
                            <p>Bienvenido a la App de Reservas</p>
                            <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
                        </>
                    ) : (
                        <>
                            <Link to="/">
                                <img src={logo} className="App-logo" alt="logo" />
                            </Link>
                            <div className="App-buttons">
                                <button className="App-buttonSingUp">
                                    <Link to="/SignUp">Sign Up</Link>
                                </button>
                                <button className="App-buttonLogIn">
                                    <Link to="/LogIn">Log In</Link>
                                </button>
                                <button>
                                    <Link to="/Reserva">reservas</Link>
                                </button>
                            </div>
                        </>
                    )}
                </header>

                <div className="App-body">
                    <Routes>
                        <Route path="/LogIn" element={<LogIn onLogIn={handleLogin} />} />
                        <Route path="/SignUp" element={<SignUp />} />
                            <Route path="/Reserva" element={<Reserva />} />

                    </Routes>
                </div>
            </div>
    );
}

export default App;

