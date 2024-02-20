import {IMG_CDN_URL} from "../utils/constants";
import {useNavigate} from "react-router-dom";

const MovieCard = ({posterPath}) => {
    const navigate = useNavigate();
    if(!posterPath) return null;
    return (
        <div className="w-36 md:w-48 pr-4">
            <img className="cursor-pointer" alt="Movie Card" src={IMG_CDN_URL + posterPath} onClick={() => navigate("play-movie")}/>
        </div>
    )
};

export default MovieCard;
