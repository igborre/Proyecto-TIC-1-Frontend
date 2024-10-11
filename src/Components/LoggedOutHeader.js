
import logo from "../logo.jpeg";
import { Link } from "react-router-dom";

const LoggedOutHeader = () => (
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
);

export default LoggedOutHeader;
