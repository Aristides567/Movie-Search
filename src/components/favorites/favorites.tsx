import { Movie } from "../../types/movie";
import {motion} from 'framer-motion';
import { Tooltip } from "react-tooltip";
import styles from "./favorites.module.css";
interface FavoritesProps {
  favorites: Movie[];
  onRemove: (id: string) => void;
}

export default function Favorites({ favorites, onRemove }: FavoritesProps) {
  return (
<section className={styles.favorites}>
      <h2 className={styles.title}>⭐ My Favorites</h2>
      {favorites.length === 0 ? (
        <p className={styles.empty}>No favorites yet!</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((movie) => (
            <div key={movie.imdbID} className={styles.card}>
              <Tooltip id="img-movie-tooltip" />
              <img
                src={movie.Poster}
                data-tooltip-content={movie.Title}
                data-tooltip-id="img-movie-tooltip"
                alt={movie.Title}
                className={styles.poster}
              />
              <div className={styles.details}>
                <motion.h3 className={styles.movieTitle}>{movie.Title}</motion.h3>
                <button
                  onClick={() => onRemove(movie.imdbID)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}