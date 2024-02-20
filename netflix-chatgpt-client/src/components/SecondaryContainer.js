import MovieList from "./MovieList";
import {useSelector} from "react-redux";

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);
    return (
        movies.nowPlayingMovies && (
            <div className="bg-black">
                <div className="mt-0 md:-mt-52 relative pl-4 md:pl-12 z-20">
                    <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
                    <MovieList title={"Top Rated"} movies={movies.topRatedMovies}/>
                    <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
                    <MovieList title={"Popular"} movies={movies.popularMovies}/>
                    {/*
           - MovieList
             - Movie Cards * n
            MovieList - Now Playing
            MovieList - Popular
            MovieList - Upcoming
            MovieList - Trending
         */}
                </div>
            </div>
        )
    )
}

export default SecondaryContainer;
