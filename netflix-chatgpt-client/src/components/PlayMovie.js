import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PlayMovie = () => {
    const { movieId } = useParams();
    useMovieTrailer(movieId);
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    return (
        <div className="w-screen">
            {trailerVideo && (
                <iframe
                    className="w-screen h-screen aspect-video"
                    src={"https://www.youtube.com/embed/" + trailerVideo.key + "?&autoplay=1"}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
            )}
        </div>
    )
}

export default PlayMovie;
