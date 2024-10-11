import React from 'react';
import logo from "./logo.jpeg";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Auth from './Utils/Auth';
import Reserva from './Components/Reserva'; // Asegúrate de tener el componente de Reserva
import LoggedInHeader from './Components/LoggedInHeader';
import LoggedOutHeader from './Components/LoggedOutHeader.js';


// Main App Component
const App = () => {

    const { isLoggedIn, handleLogin, handleLogout } = Auth();



    return (
        <div className="App">
            <header className="App-header">
                {isLoggedIn ? (
                    <LoggedInHeader handleLogout={handleLogout} />
                ) : (
                    <LoggedOutHeader />
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
    )
};

export default App;

