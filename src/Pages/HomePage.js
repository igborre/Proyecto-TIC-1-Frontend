import { Link } from "react-router-dom";
import Button from "../Components/Button";
import MovieList from "../Components/MovieList";

const Home = () => {
  return (
    <div>
      <MovieList />
      <Link to="/movieUpload">
        <Button>Upload a Movie</Button>
      </Link>
    </div>
  );
};

export default Home;
