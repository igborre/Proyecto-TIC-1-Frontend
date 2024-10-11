

const LoggedInHeader = ({ handleLogout }) => (
    <>
        <p>Bienvenido a la App de Reservas</p>
        <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
        </button>
    </>
);

export default LoggedInHeader;

