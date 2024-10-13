import React from "react";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import LogIn from "./Pages/LogInPage.js";
import SignUp from "./Pages/RegisterPage.js";
import Reserva from "./Pages/ReservationsPage.js";
import ProfileMenu from "./Components/ProfileMenu";
import LoggedOutHeader from "./Components/LoggedOutHeader.js";
import MovieList from "./Components/MovieList.js";
import MovieUpload from "./Pages/MovieUploadPage.js";
import Home from "./Pages/HomePage.js";
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
        {isLoggedIn === "true" ? <ProfileMenu /> : <LoggedOutHeader />}
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
