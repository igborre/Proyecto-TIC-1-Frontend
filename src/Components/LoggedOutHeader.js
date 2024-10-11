import logo from "../logo.jpeg";
import { Link } from "react-router-dom";
import Button from "./Button";
import "./Button.css";

const LoggedOutHeader = () => (
  <>
    <Link to="/">
      <img src={logo} className="App-logo" alt="logo" />
    </Link>
    <div className="App-buttons">
      <Link to="/SignUp" className="link-style">
        <Button>Sign Up</Button>
      </Link>
      <Link to="/LogIn" className="link-style">
        <Button>Log In</Button>
      </Link>
      <Link to="/Reserva" className="link-style">
        <Button>Reservas</Button>
      </Link>
      <Link to="/Movies" className="link-style">
        <Button>Movies</Button>
      </Link>
    </div>
  </>
);

export default LoggedOutHeader;
