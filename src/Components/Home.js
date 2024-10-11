import { Link } from "react-router-dom";
import Button from "./Button";

const Home = () => {
  return (
    <div>
      <Link to="/movieUpload">
        <Button>Upload a Movie</Button>
      </Link>
    </div>
  );
};

export default Home;
