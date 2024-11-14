import { useState, useEffect } from "react";
import axiosInstance from "../Utils/AxiosConfig";

const Listings = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get(
          `api/v1/movies?page=${page}&size=5`
        );
        setMovies(response.data.content); // Contenido de la página de películas
        setTotalPages(response.data.totalPages); // Total de páginas
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h1>Películas</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={page === 0}>
          Anterior
        </button>
        <button onClick={handleNextPage} disabled={page === totalPages - 1}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Listings;
