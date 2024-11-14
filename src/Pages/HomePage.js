import { Link } from "react-router-dom";
import Button from "../Components/Button";
import MovieList from "../Components/MovieList";
import Listings from "../Components/Listings";

const Home = () => {
  return (
    <div>
      <MovieList />
      <Listings />
    </div>
  );
};

export default Home;
