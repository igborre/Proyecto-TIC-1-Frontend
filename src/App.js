import React from 'react';
import logo from "./logo.jpeg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Auth from './Utils/Auth';

function App() {
    const { isLoggedIn, handleLogin, handleLogout } = Auth();

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    {isLoggedIn ? (
                        <button onClick={handleLogout}> Me voy a pegar un tiro</button>
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
                            </div>
                        </>
                    )}
                </header>

                <div className="App-body">
                    <Routes>
                        <Route path="/LogIn" element={<LogIn onLogIn={handleLogin} />} />
                        <Route path="/SignUp" element={<SignUp />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
