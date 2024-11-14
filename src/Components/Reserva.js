import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/Reservations.css";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [movies, setMovies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [dateTimes, setDateTimes] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);

  // The movie has been clicked on
  const selectedMovie = searchParams.get("movie");
  //   console.log("selected movie:" + selectedMovie);

  // // Se consiguen las peliculas
  // useEffect(() => {
  //     // Se define una funcion
  //     const fetchMovies = async () => {
  //         try {
  //             const response = await axiosInstance.get("/api/v1/movies");
  //             console.log("Fetching movies to backend");
  //             setMovies(response.data);
  //             setLoading(false);
  //         } catch (err) {
  //             setError("Failed to load movies.");
  //             setLoading(false);
  //         }
  //     };
  //     // Se llama para guarar las peliculas
  //     fetchMovies();

  // }, []);

  // Given that Movie, get the locations
  useEffect(() => {
    // When changing the Movie, all else is needed to be selected again
    setSelectedSeats([]);
    setSelectedTime("");
    setSelectedDate("");
    setSelectedLocation("");

    const getTheaters = async () => {
      try {
        // Get the screening for the movie
        const response = await axiosInstance.get(
          `/api/v1/movies/theaters?movieId=${selectedMovie}`
        );
        setLoading(false);
        console.log(response); // Log the response
        // TODO: check if this is right
        setLocations(response); // It should have the Theatre Id and Theatre Zone
      } catch (err) {
        setError("Failed to load screenings");
      }
    };
    // Call the funcion once a movie is selected or the selected movie changes
    getTheaters();
  }, [selectedMovie]);


  // Having chosen the location, see that dates
  useEffect(() => {
    // If is not reseting (That happens when you change a value that has been selected above)
    if (selectedLocation !== "") {
      // Reset values dependent on the screening location if it changes or a new movie is being sle
      setSelectedSeats([]);
      setSelectedTime("");
      setSelectedDate("");
      const fetchDates = async () => {
        try {
          const response = await axiosInstance.get(
            `/api/v1/movies/theaters/time?movieId=${selectedMovie}&theaterId=${selectedLocation}`
          );
          setDateTimes(response.data);
          const uniqueDates = response.data
            .map((DateTimes) => DateTimes.toLocaleDateString())
            .filter((value, index, self) => self.indexOf(value) === index);
          setDates(uniqueDates);
        } catch (err) {
          setError("Failed to load screenings");
        }
      };
      // Call the function each time the selected location changes
      fetchDates();
    }
  }, [selectedLocation]);

  // No not need to request new data, since date and time are stored
  useEffect(() => {
    if (selectedDate !== "") {
      // Values that may not be equal for all dates
      setSelectedSeats([]);
      setSelectedTime("");
      const Times = []
      for (let dateAndTimes of dateTimes){
        if (dateAndTimes.toLocaleDateString() === selectedDate) {
          Times.append(dateAndTimes.toLocaleTimeString())
        }
        setTimes(Times)
      }
    }
  }, [selectedDate]);

  // Given all above, get possible times
  useEffect(() => {
    if (selectedTime !== "") {
      // Reset seats
      setSelectedSeats([]);
      const fetchSeats = async () => {
        try {
          const response = await axiosInstance.get(
            `/api/v1/screenings/${selectedMovie}/${selectedLocation}/${selectedDate}/${selectedTime}`
          );
          // Get the seats for that screening
          setAvailableSeats(response.data.seats);
        } catch (err) {
          setError("Failed to load screenings");
        }
      };
      fetchSeats();
    }
  }, [selectedTime]);

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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="reserva-container">
      <h2>Reserva tu Película</h2>

      {/* Selección de Película
      <div className="reserva-field">
        <label>Selecciona una película:</label>
        <select
          value={selectedMovie ? selectedMovie.title : ""}
          onChange={(e) => {
            const selectedMovie = movies.find(
              (movie) => movie.title === e.target.value
            );
            setSelectedMovie(selectedMovie);
          }}
        >
          <option value="">--Selecciona una película--</option>
          {movies.map((movie, index) => (
            <option key={index} value={movie.title}>
              {movie.title}
            </option>
          ))}
        </select>
      </div> */}

      {/* Selección de Lugar (cine) ajustar a que a travez del lugar se seleccione el objeto, como arriba*/}
      <div className="reserva-field">
        <label>Selecciona el cine:</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">--Selecciona un cine--</option>
          {locations.map((location) => (
              <option key={location.theaterId} value={location.theaterId}>
                {location.theaterZone}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de Fecha Solo de las posibles*/}
      <div className="reserva-field">
        <label>Selecciona la fecha:</label>
        <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">--Selecciona una fecha--</option>
          {dates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
          ))}
        </select>
      </div>

      {/* Selección de Hora Solo de las posibles*/}
      <div className="reserva-field">
        <label>Selecciona la hora:</label>
        <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">--Selecciona la hora--</option>
          {dates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
          ))}
        </select>
      </div>

      {/* Selección de Asientos  Aniadir diferencias seleccionados y no*/}
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
