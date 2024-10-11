import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp.js";
import Auth from "./Utils/Auth";
import Reserva from "./Components/Reserva";
import LoggedInHeader from "./Components/LoggedInHeader";
import LoggedOutHeader from "./Components/LoggedOutHeader.js";
import MovieList from "./Utils/MovieList.js";
import MovieUpload from "./Components/MovieUpload.js";
import Home from "./Components/Home.js";
import { Link } from "react-router-dom";
import logo from "./logo.jpeg";
import Button from "./Components/Button.js";

// Main App Component
const App = () => {
  const { isLoggedIn, handleLogin, handleLogout } = Auth();

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <Link to="/Movies" className="link-style">
          <Button>Movies</Button>
        </Link>
        <Link to="/Reserva" className="link-style">
          <Button>Reservas</Button>
        </Link>
        {isLoggedIn ? (
          <LoggedInHeader handleLogout={handleLogout} />
        ) : (
          <LoggedOutHeader />
        )}
      </header>

      <div className="App-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logIn" element={<LogIn onLogIn={handleLogin} />} />
          <Route path="/signUp" element={<SignUp onLogIn={handleLogin} />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="movieUpload" element={<MovieUpload />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
