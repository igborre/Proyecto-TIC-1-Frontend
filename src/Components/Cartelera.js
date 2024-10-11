import React, { useState, useEffect } from 'react';
import "./Cartelera.css"

const Cartelera = () => {

    const [state, setState] = useState("filterByMovies"); // Filtrar por peliculas o en una sala en especifico
    // Se ponde Filter by movies o Id de salas
    const [theaters, setTheaters] = useState([]);
    const [movies, setMovies] = useState([]); // Items en carlera (Se hace request al backend)
    const [error, setError] = useState(null); // Si la respuesta es un error

    const fetchCarteleraData = async () => {
        try { // Si no da error
            if (state === "filterByMovies") {
                const response = await fetch(''); // Hay que poner a donde se hace request
                if (!response.ok) throw new Error('Could not fetch movies data'); // El error
                const data = await response.json(); // Se guarda el json, solo se necesita los nombres
                setMovies(data); // Se guarda el json en data
                setError(null); // Se resetea que no hay errores
                }
            else { // Si no es la id del theater
                const response = await fetch(''); // Hay que poner a donde se hace request, añadir el ?theaterId
                if (!response.ok) throw new Error('Could not fetch movies data');
                const data = await response.json();
                setMovies(data)
                setError(null);
            }
        } catch (err) { // Si dio error
            console.error(err);
            setError('Failed to load items');
        }
    };

    // Funcion para saber sucursales
    const getTheaters = async () => {
        try {
            const response = await fetch(''); // Hay que poner a donde se hace request de las sucursales
            if (!response.ok) throw new Error('Could not fetch movies data');
            const data =  [{"Id":1,"Localidad":"Punta Carretas"},{"Id":2,"Localidad":"Buceo"},{"Id":3,"Localidad":"Carrasco"}]          //await response.json();
            setTheaters(data);
        }
        catch (err) { // Si dio error
            console.error("Could not fetch theaters");
    }
    }

    const allMovies = () => {
        setState("filterByMovies");
        setMovies([]); // Reset movies when showing all
    };

    useEffect(() => {
        getTheaters(); // Call the fetch function when the component mounts
    }, []); // Empty dependency array to run once


    // Que se ve y hace en la pagina
    return (
        <div className="reserva-container">
            {/* Se hace un fetch de las sucursales */}
            <div className="reserva-field">
                <button className="button-All" onClick={allMovies}>Mostrar Todas las Peliculas</button>
                <select className="Select-Theater" onChange={(e) => setState(e.target.value)} value={state}>
                    <option value="">--Selecciona un cine--</option>
                    {theaters.length > 0 ? (
                        theaters.map((location) => (
                            <option key={location.Id} value={location.Id}>
                                {location.Localidad}
                            </option>
                        ))
                    ) : (
                        <option disabled>Cargando cines...</option>
                    )}
                </select>
            </div>
            <button onClick={fetchCarteleraData}>--Selecciona una película--</button>
            <ul>
                {movies.map((movie, index) => (
                    <li key={index}>{movie}</li>
                ))}
            </ul>
        </div>
    )
};

export default Cartelera;

