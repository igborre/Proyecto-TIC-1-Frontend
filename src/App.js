import React, { useState, useEffect } from 'react';
import logo from "./logo.jpeg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, useLocation} from "react-router-dom";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Auth from './Utils/Auth';
import Cartelera from "./Components/Cartelera";
import AboutUs from "./Components/Sucursales";
import Reserva from './Components/Reserva'; // Asegúrate de tener el componente de Reserva


function App() {
    const { isLoggedIn, handleLogin, handleLogout } = Auth();
    const location = useLocation();

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
                            <img src={logo} className="App-logo" alt="logo"/>
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

                {location.pathname === '/' &&
                    <Cartelera/>
                }

                <Routes>
                    <Route path="/LogIn" element={<LogIn onLogIn={handleLogin}/>}/>
                    <Route path="/SignUp" element={<SignUp/>}/>
                    <Route path="/Reserva" element={<Reserva/>}/>
                    <Route path="/AboutUs" element={<AboutUs/>}/>
                </Routes>
            </div>
            <footer className="App-footer">
                <p>&copy; What The Fun Movies 2024</p>
                <p>
                    <Link to="/AboutUs">Nuestras Sucursales</Link>
                </p>
            </footer>
        </div>
    );
}

export default App;

