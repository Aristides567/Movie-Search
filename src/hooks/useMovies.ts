import { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "../types/movie";

export function UseMovies(query: string, apiKey: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const randomTerms = ["action", "comedy", "drama"];
  const DEFAULT_SEARCH = randomTerms[Math.floor(Math.random() * randomTerms.length)];


  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const searchTerm = query.trim() === "" ? DEFAULT_SEARCH : query;
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}&plot=full`
        );

        if (response.data.Response === "True") {
          const results = query.trim() === "" 
            ? response.data.Search.slice(0, 20) 
            : response.data.Search;
          setMovies(results);
        } else {
          setError(response.data.Error || "No movies found");
        }
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, apiKey]);

  return { movies, loading, error };
}