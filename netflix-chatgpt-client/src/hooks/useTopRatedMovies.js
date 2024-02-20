import {useDispatch, useSelector} from "react-redux";
import {API_OPTION} from "../utils/constants";
import {addTopRatedMovies} from "../utils/movieSlice";
import {useEffect} from "react";

const useTopRatedMovies = () => {

    const dispatch = useDispatch();

    const topRatedMovies = useSelector((store)=> store.movies.topRatedMovies);

    const getTopRatedMovies = async() => {
        const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", API_OPTION);
        const response = await data.json();
        dispatch(addTopRatedMovies(response.results));
    }

    useEffect(() => {
        !topRatedMovies && getTopRatedMovies();
    }, []);
}

export default useTopRatedMovies;
