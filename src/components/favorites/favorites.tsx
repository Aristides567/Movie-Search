import { Movie } from "../../types/movie";
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
              <img
                src={movie.Poster}
                alt={movie.Title}
                className={styles.poster}
              />
              <div className={styles.details}>
                <h3 className={styles.movieTitle}>{movie.Title}</h3>
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