import { useState } from "react";
import { SearchBar } from "./components/searchBar/searchBar"
import { UseMovies } from "./hooks/useMovies";
import { Movie } from "./types/movie";
import { UselocalStorage } from "./hooks/useLocalStorage";
import Favorites from "./components/favorites/favorites";
import SkeletonLoader from "./components/skeletonLoader/skeletonLoader";
import MovieCard from "./components/MovieCard/movieCard";
import {motion} from 'framer-motion';
import styles from './App.module.css';

const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [query, setQuery] = useState("");
  const {movies, loading, error} = UseMovies(query, API_KEY);
  const [favorites, setFavorites] = UselocalStorage<Movie[]>('favorites', []);

  const addToFavorites = (movie: Movie) => {
    if(!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
      alert(`Se ha añadido ${movie.Title} a tus favoritos`);
    }
  }

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter((movie) => movie.imdbID !== id));
  }
  
  return (
    <>
    <div className={styles.app}>
        <div className={styles.container}>
          <motion.h1 initial={{ x: -1000 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 100 }} className={styles.title}>Movie Search</motion.h1>
          
          <SearchBar onSearch={setQuery} />

          {loading && <SkeletonLoader />}
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.movieGrid}>
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                favorites = {favorites}
                onAddToFavorites={addToFavorites}
              />
            ))}
          </div>

          <Favorites
            favorites={favorites}
            onRemove={removeFromFavorites}
          />
        </div>
      </div>
    </>
  )
}

export default App
