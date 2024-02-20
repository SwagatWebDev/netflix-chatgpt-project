import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {API_OPTION} from "../utils/constants";
import {addTrailerVideo} from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        getMovieVideos();
    }, []);

    const getMovieVideos = async() => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId+ "/videos?language=en-US", API_OPTION);
        const response = await data.json();
        const filterData = response.results.filter(movie => movie.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : response.results[0];
        dispatch(addTrailerVideo(trailer))
    }
}

export default useMovieTrailer;
