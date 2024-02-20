import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const  VideoTitle = ({title, overview}) => {
    const navigate = useNavigate();
    return (
        <div className="w-screen aspect-video absolute md:px-24 px-6 pt-[15%] bg-gradient-to-r from-black text-white">
            <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
            <p className="hidden md:inline-block py-6 text-lg w-1/3">{overview}</p>
            <div className="my-4 md:m-0">
                <button className="bg-white text-black py-1 px-3 md:py-4 md:px-12 text-xl rounded-lg hover:bg-opacity-80"
                onClick={() => navigate("/play-movie")}>
                    ▶ Play
                </button>
                <button className="hidden md:inline-block mx-2 bg-gray-500 text-white p-4 px-12 text-xl rounded-lg hover:bg-opacity-80">
                    <FontAwesomeIcon icon={faCircleInfo} className="mx-2"/>
                    More Info
                </button>
            </div>
        </div>
    )
}

export default VideoTitle;
