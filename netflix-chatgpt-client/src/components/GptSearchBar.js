import {useDispatch, useSelector} from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import {useRef} from "react";
import {API_OPTION} from "../utils/constants";
import {addGptMovieResult} from "../utils/gptSlice";

const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();

    const searchMoviesInTMDB = async (movie) => {
        const movieData = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie +"&include_adult=false&language=en-US&page=1", API_OPTION);
        const response = await movieData.json();
        return response;
    }

    const handleGPTSearchClick = async () => {

        const gptQuery = "Act as a movie Recommendation system and suggest some movie for the query: "
        + searchText.current.value + ". Only give me the names of 5 movies, comma separated like example result given ahead. Example Result: Golmaal3, Sholay, Don, 3 Idiots, Gadar";

        const gptResult = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });

        if(!gptResult) {
            // TODO: Write Error Handling case
        }

        const gptMovies = gptResult.choices?.[0]?.message?.content.split(',');

        const promiseArray = gptMovies.map((movie) => searchMoviesInTMDB(movie));

        const tmdbResult = await Promise.all(promiseArray);

        dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResult}));
    }

    return (
        <div className="md:pt-[13%] pt-[45%] flex justify-center">
            <form className="md:w-1/2 w-screen md:my-0 my-6 bg-black grid grid-cols-12" onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    ref={searchText}
                    className="p-4 m-4 col-span-8 md:col-span-9"
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    className="py-2 m-4 px-4 rounded-lg bg-red-700 col-span-4 md:col-span-3"
                    onClick={handleGPTSearchClick}
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
};

export default GptSearchBar;
