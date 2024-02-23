import {IMG_CDN_URL} from "../utils/constants";
import {Link, useNavigate} from "react-router-dom";

const MovieCard = ({posterPath, movieId}) => {
    if(!posterPath) return null;
    return (
        <div className="w-36 md:w-48 pr-4">
            <Link to={`/play-movie/${movieId}`}> {/* Use Link to navigate to PlayMovie */}
                <img className="cursor-pointer" alt="Movie Card" src={IMG_CDN_URL + posterPath} />
            </Link>
        </div>
    )
};

export default MovieCard;
