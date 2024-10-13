import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp.js";
import Reserva from "./Components/Reserva";
import LoggedInHeader from "./Components/LoggedInHeader";
import LoggedOutHeader from "./Components/LoggedOutHeader.js";
import MovieList from "./Utils/MovieList.js";
import MovieUpload from "./Components/MovieUpload.js";
import Home from "./Components/Home.js";
import { Link } from "react-router-dom";
import logo from "./logo.jpeg";
import Button from "./Components/Button.js";
import Cookies from "js-cookie";

// Main App Component
const App = () => {
  const isLoggedIn = Cookies.get("isLoggedIn");
  const showCookies = () => {
    console.log("jwtToken: ", Cookies.get("jwtToken"));
    console.log("isLoggedIn: ", Cookies.get("isLoggedIn"));
  };

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
        {/* TODO: Borrar este boton porque es para debug */}
        <button onClick={showCookies}>Show Cookies</button>
        {isLoggedIn === "true" ? <LoggedInHeader /> : <LoggedOutHeader />}
      </header>

      <div className="App-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="movieUpload" element={<MovieUpload />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
