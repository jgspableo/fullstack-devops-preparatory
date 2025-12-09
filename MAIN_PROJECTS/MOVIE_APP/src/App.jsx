import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import "./App.css";
import MovieCard from "./components/MovieCard.jsx";
import { updateSearchCount, getTrendingMovies } from "./appwrite.js";

//declare movie db api
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {

  //leisure hooks
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  //hooks for app components
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  //optimize the search function
  //wait for user to finish typing before registering the search
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  //fetches all movies from api 
  const fetchMovies = async (query = "") => {
    try {
      setIsLoading(true); //initially load
      setErrorMessage(""); //initialize error message

      //define endpoint by checking if there is a query (there is a search)
      const endpoint = query
        //if there is, use the search query with the search term
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
        //if none, default to all movies
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS); 
      //check error
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      
      //assign data to api response
      const data = await response.json();

      //if there is no response or a failed response
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed top fetch movies");
        setMovieList([]);
        return;
      }

      //update movie list state
      setMovieList(data.results || []);

      //update the search count in the db for the first movie that comes up
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally { //whatever happens, isLoading = false after fetching movies
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies(); //get
      setTrendingMovies(movies); //update trending movies state
    } catch (error) {
      setErrorMessage("Error fetching trending movies. Please try again later.");
    }
  };

  //load trending movies once
  useEffect(() => {
    loadTrendingMovies();
  }, []); 

  //fetch movies based on the dst and update every time dst's state is updated
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  //web structure
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="hero.png" alt="Hero Image" />
          <h1>
            Find the <span className="text-gradient">Movies</span> Worth Your
            Time
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={index}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        
        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
