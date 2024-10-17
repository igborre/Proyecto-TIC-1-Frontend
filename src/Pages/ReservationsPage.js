import React, { useState, useEffect } from "react";
import "../styles/Reservations.css";

const Reserva = () => {
  // opciones que el usuario puede seleccionar
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [movies, setMovies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);

  // Simulación de datos que podrían venir del backend
  useEffect(() => {
    // Películas disponibles
    setMovies(["Pelicula 1", "Pelicula 2", "Pelicula 3"]);
    // Localizaciones (cines o sucursales)
    setLocations(["Cine 1", "Cine 2", "Cine 3"]);
    // Asientos disponibles
    setAvailableSeats(["A1", "A2", "B1", "B2"]);
  }, []);

  // Manejar la selección de asientos
  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Manejar la confirmación de la reserva
  const handleReserve = () => {
    if (
      selectedMovie &&
      selectedDate &&
      selectedTime &&
      selectedSeats.length > 0 &&
      selectedLocation
    ) {
      alert(
        `Reserva confirmada para ${selectedMovie} en ${selectedLocation} el ${selectedDate} a las ${selectedTime}. Asientos: ${selectedSeats.join(
          ", "
        )}`
      );
    } else {
      alert("Por favor, complete todos los campos para hacer la reserva.");
    }
  };

  return (
    <div className="reserva-container">
      <h2>Reserva tu Película</h2>

      {/* Selección de Película */}
      <div className="reserva-field">
        <label>Selecciona una película:</label>
        <select
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
        >
          <option value="">--Selecciona una película--</option>
          {movies.map((movie, index) => (
            <option key={index} value={movie}>
              {movie}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de Fecha */}
      <div className="reserva-field">
        <label>Selecciona la fecha:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Selección de Hora */}
      <div className="reserva-field">
        <label>Selecciona la hora:</label>
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
      </div>

      {/* Selección de Lugar (cine) */}
      <div className="reserva-field">
        <label>Selecciona el cine:</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">--Selecciona un cine--</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
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
              className={`seat ${
                selectedSeats.includes(seat) ? "selected" : ""
              }`}
              onClick={() => handleSeatSelection(seat)}
            >
              {seat}
            </button>
          ))}
        </div>
      </div>

      {/* Botón de Confirmar Reserva */}
      <button className="reserva-button" onClick={handleReserve}>
        Confirmar Reserva
      </button>
    </div>
  );
};

export default Reserva;
