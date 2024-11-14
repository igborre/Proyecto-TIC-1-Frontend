import React, { useState, useEffect } from 'react';
import './Reserva.css';
import axiosInstance from "../Utils/AxiosConfig";
// Que falta
// Al seleccionar las peliculas, se reinicia cine y lo demas (Se actualiza selected Movie, se ven  los cines para esa peli y reinicia lo demas )
// Al seleccionar el cine, se reinicia horas fechas y asientos
// Selecciona fecha, reinicia horas y asientos
// Selecciona hora, reinicia asiento seleccionado


const Reserva = () => {
    // opciones que el usuario puede seleccionar
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [movies, setMovies] = useState([]);
    const [locations, setLocations] = useState([]);
    const [dates, setDates] = useState([]);
    const [availableSeats, setAvailableSeats] = useState([]);


    // Se consiguen las peliculas
    useEffect(() => {
        // Se define una funcion
        const fetchMovies = async () => {
            try {
                const response = await axiosInstance.get("/api/v1/movies");
                console.log("Fetching movies to backend");
                setMovies(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load movies.");
                setLoading(false);
            }
        };
        // Se llama para guarar las peliculas
        fetchMovies();

    }, []);


    // Una vez se selecciona la pelicula, se elige el cine, cuando pasa se reinician los valores de horas y dias
    // Siempre hay una pelicula seleccionada una vez se elige una
    useEffect(() => {
        // Se reinicia lo que viene despues
        setSelectedSeats([])
        setSelectedTime('')
        setSelectedDate('')
        setSelectedLocation('')
        const fetchScreenings = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/screenings/${selectedMovie}`);
                // Ver localidades de las peliculas
                const uniqueLocations = response.data
                    .map((ele) => ele.location) // Se mapean los lugares en cada screening
                    .filter((value, index, self) => self.indexOf(value) === index); // Se filtrar para que sean unicos
                setLocations(uniqueLocations);
            } catch (err) {
                setError("Failed to load screenings")
            }
        };
        fetchScreenings();
    }, [selectedMovie])

    // Conseguir las fechas una vez se tiene el lugar y pelicula
    useEffect(() => {
        if (selectedLocation !== '') {
            // Se resetean los valores
            setSelectedSeats([])
            setSelectedTime('')
            setSelectedDate('')
            const fetchDates = async () => {
                try {
                    const response = await axiosInstance.get(`/api/v1/screenings/${selectedMovie}/${selectedLocation}`);
                    // Ver dias de las peliculas
                    const uniqueDates = response.data
                        .map((ele) => ele.date) // Se mapean los las fechas de los screening
                        .filter((value, index, self) => self.indexOf(value) === index); // Se filtrar para que sean unicos
                    setDates(uniqueDates);
                } catch (err) {
                    setError("Failed to load screenings")
                }
            }
            fetchDates();
        }
    }, [selectedLocation])

    // Conseguir las horas una vez se tiene lo de arriba
    useEffect(() => {
        if (selectedDate !== '') {
            // Se resetean los valores
            setSelectedSeats([])
            setSelectedTime('')
            const fetchTimes = async () => {
                try {
                    const response = await axiosInstance.get(`/api/v1/screenings/${selectedMovie}/${selectedLocation}/${selectedDate}`);
                    // Ver dias de las peliculas
                    const uniqueDates = response.data
                        .map((ele) => ele.times) // Se mapean los las fechas de los screening
                        .filter((value, index, self) => self.indexOf(value) === index); // Se filtrar para que sean unicos
                    setDates(uniqueDates);
                } catch (err) {
                    setError("Failed to load screenings")
                }
            }
            fetchTimes();
        }
    }, [selectedDate])

    // Conseguir las horas una vez se tiene lo de arriba
    useEffect(() => {
        if (selectedTime !== '') {
            // Se resetean los valores
            setSelectedSeats([])
            const fetchSeats = async () => {
                try {
                    const response = await axiosInstance.get(`/api/v1/screenings/${selectedMovie}/${selectedLocation}/${selectedDate}/${selectedTime}`);
                    // Ver dias de las peliculas
                    setAvailableSeats(response.data.seats);
                } catch (err) {
                    setError("Failed to load screenings")
                }
            }
            fetchSeats();
        }
    }, [selectedTime])

    // Manejar la selección de asientos
    const handleSeatSelection = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    // Manejar la confirmación de la reserva
    const handleReserve = () => {
        if (selectedMovie && selectedDate && selectedTime && selectedSeats.length > 0 && selectedLocation) {
            alert(`Reserva confirmada para ${selectedMovie} en ${selectedLocation} el ${selectedDate} a las ${selectedTime}. Asientos: ${selectedSeats.join(', ')}`);
        } else {
            alert('Por favor, complete todos los campos para hacer la reserva.');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="reserva-container">
            <h2>Reserva tu Película</h2>

                {/* Selección de Película */}
                <div className="reserva-field">
                    <label>Selecciona una película:</label>
                    <select value={selectedMovie ? selectedMovie.title : ''} onChange={(e) => {
                        const selectedMovie = movies.find(movie => movie.title === e.target.value);
                        setSelectedMovie(selectedMovie);
                    }}>
                        <option value="">--Selecciona una película--</option>
                        {movies.map((movie, index) => (
                            <option key={index} value={movie.title}>{movie.title}</option>
                        ))}
                    </select>
                </div>

            {/* Selección de Lugar (cine) ajustar a que a travez del lugar se seleccione el objeto, como arriba*/}
            <div className="reserva-field">
                <label>Selecciona el cine:</label>
                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                    <option value="">--Selecciona un cine--</option>
                    {locations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
            </div>

            {/* Selección de Fecha Solo de las posibles*/}
            <div className="reserva-field">
                <label>Selecciona la fecha:</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>

            {/* Selección de Hora Solo de las posibles*/}
            <div className="reserva-field">
                <label>Selecciona la hora:</label>
                <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
            </div>

            {/* Selección de Asientos  Aniadir diferencias seleccionados y no*/}
            <div className="reserva-field">
                <label>Selecciona tus asientos:</label>
                <div className="seats-container">
                    {availableSeats.map((seat, index) => (
                        <button
                            key={index}
                            className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                            onClick={() => handleSeatSelection(seat)}
                        >
                            {seat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Botón de Confirmar Reserva */}
            <button className="reserva-button" onClick={handleReserve}>Confirmar Reserva</button>
        </div>
    );
};

export default Reserva;
