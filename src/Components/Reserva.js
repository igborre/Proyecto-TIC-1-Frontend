import React, { useState, useEffect } from 'react';
import './Reserva.css';
import axiosInstance from "../Utils/AxiosConfig";

// Queda terminar funciones para conseguir asientos y horas
// Que las fechas posibles sean las de dates y no cualquiera
// Mismo con horas y asientos

const Reserva = () => {
    // opciones que el usuario puede seleccionar
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [movies, setMovies] = useState([]);
    const [locations, setLocations] = useState([]);
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);
    const [availableSeats, setAvailableSeats] = useState([]);
    const [screening, setScreening] = useState([]);
    const [error, setError] = useState(null);

    const resetSeats = async () => {
        setSelectedSeats([]);
        setAvailableSeats([])
    }
    const resetTime = async () => {
        await resetSeats()
        setSelectedTime('')
        setTimes([])
    }

    const resetDate = async () => {
        await resetTime()
        setSelectedDate('')
        setDates([])
    }


    // Simulación de datos que podrían venir del backend
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axiosInstance.get("/api/v1/movies");
                console.log("Fetching movies to backend");
                setMovies(response.data);
            } catch (err) {
                setError("Failed to load movies.");
            }
        };

        fetchMovies();

    }, []);

    useEffect(() => {
        resetTime();
        const fetchLocations = async () => {
            try {
                const response = await axiosInstance.get("/api/v1/movies/{selectedMovie.id}/screenings");
                console.log("Fetching screenings to backend");
                setScreening(response.data);
                const newLocations = []
                for (let i = 0; i < screening.length; i++) {
                    if (!newLocations.includes(screening[i].location)) {
                        newLocations.append(screening[i].location);
                    }
                }
                setLocations(newLocations);
            } catch (err) {
                setError("Failed to load locations.");
            }
        };

        fetchLocations();

    }, [selectedMovie]);

    useEffect(() => {
        resetTime()
        if (selectedMovie !== "") {
            const  possibleDates = async () => {
                const posDates = []
                 // Se hace reset de las otras variables seleccionadas despues

                for (let i = 0; i < screening.length; i++){
                    // Se ve que sea en el cine seleccionado
                    if (screening.location === selectedLocation) {
                        if (!posDates.includes(screening[i].date)) {
                            posDates.append(screening[i].date);
                        }
                    }
                }
                setDates(posDates)
            }
            possibleDates()}
    }, [selectedLocation]);

    useEffect(() => {
        resetSeats()
        if (selectedDate !== "")
        setTimes();
    }, [selectedDate])

    useEffect(() => {
        if (selectedTime !== "")
        setAvailableSeats()
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

    return (
        <div className="reserva-container">
            <h2>Reserva tu Película</h2>

            {/* Selección de Película */}
            <div className="reserva-field">
                <label>Selecciona una película:</label>
                <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
                    <option value="">--Selecciona una película--</option>
                    {movies.map((movie, index) => (
                        <option key={index} value={movie}>{movie}</option>
                    ))}
                </select>
            </div>

            {/* Selección de Fecha */}
            <div className="reserva-field">
                <label>Selecciona la fecha:</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>

            {/* Selección de Hora */}
            <div className="reserva-field">
                <label>Selecciona la hora:</label>
                <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
            </div>

            {/* Selección de Lugar (cine) */}
            <div className="reserva-field">
                <label>Selecciona el cine:</label>
                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                    <option value="">--Selecciona un cine--</option>
                    {locations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
            </div>

            {/* Selección de Asientos */}
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
