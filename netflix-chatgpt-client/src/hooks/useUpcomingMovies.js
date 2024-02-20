import {useDispatch, useSelector} from "react-redux";
import {API_OPTION} from "../utils/constants";
import {addUpcomingMovies} from "../utils/movieSlice";
import {useEffect} from "react";

const useUpcomingMovies = () => {

    const dispatch = useDispatch();

    const upcomingMovies = useSelector((store)=> store.movies.upcomingMovies);

    const getUpcomingMovies = async() => {
        const data = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", API_OPTION);
        const response = await data.json();
        dispatch(addUpcomingMovies(response.results));
    }

    useEffect(() => {
        !upcomingMovies && getUpcomingMovies();
    }, []);
}

export default useUpcomingMovies;
