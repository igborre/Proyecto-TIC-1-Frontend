import React, { useState, useEffect } from 'react';
import logo from "./logo.jpeg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, useLocation} from "react-router-dom";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Auth from './Utils/Auth';
import Cartelera from "./Components/Cartelera";

// Se podira sacar de aca, y implementar el header afuera?

function App() {
  const { isLoggedIn, handleLogin, handleLogout } = Auth();
  const location = useLocation();

  return (
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
          {location.pathname === '/' &&
              <div className="App-body">
                  <div className=".cartelera">
                    <Cartelera />
                  </div>
              </div>
          }



          <div className="App-body">
            <Routes>
              <Route path="/LogIn" element={<LogIn onLogIn={handleLogin} />} />
              <Route path="/SignUp" element={<SignUp />} />
            </Routes>
          </div>
        </div>
  );
}

export default App;
