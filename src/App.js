import React from 'react';
import logo from './logo.jpeg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LogIn from './Components/LogIn';

function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="./">
              <img src={logo} className="App-logo" alt="logo"/>
            </Link>
            <div className="App-buttons">
              <button className="App-buttonSingUp">
                <a href="https://youtube.com">
                  Sign Up
                </a>
              </button>
              <button className="App-buttonLogIn">
                <Link to="/LogIn">
                  Log In
                </Link>
              </button>
            </div>
          </header>

          <div className="App-body">
          <Routes>
            <Route path="/LogIn" element={<LogIn />} />
          </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
