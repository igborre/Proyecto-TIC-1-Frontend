import React from 'react';
import './FrontPage.css'; // Asegúrate de importar el CSS

const FrontPage = () => {
    return (
        <div>
            <nav className="navbar">
                <h1>What the Fun Cinema</h1>
            </nav>
            <div className="main-banner" style={{ backgroundImage: `url('/Pelicula1.jpg')` }}>
                <div className="movie-info">
                    <h2 className="title">Película destacada</h2>
                    <p className="details">Fantasía / Comedia - 92 min - 4D</p>
                </div>
            </div>
        </div>
    );
}

export default FrontPage;




