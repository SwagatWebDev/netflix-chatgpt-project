import {useDispatch, useSelector} from "react-redux";
import {API_OPTION} from "../utils/constants";
import { addPopularMovies} from "../utils/movieSlice";
import {useEffect} from "react";

const usePopularMovies = () => {

    const dispatch = useDispatch();

    const popularMovies = useSelector((store)=> store.movies.popularMovies);

    const getPopularMovies = async() => {
        const data = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", API_OPTION);
        const response = await data.json();
        dispatch(addPopularMovies(response.results));
    }

    useEffect(() => {
        !popularMovies && getPopularMovies();
    }, []);
}

export default usePopularMovies;
