import { Movie } from "../../types/movie";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
  onAddToFavorites: (movie: Movie) => void;
}

export default function MovieCard({ movie, onAddToFavorites }: MovieCardProps) {
  return (
    <div className={styles.card}>
      <img
        src={movie.Poster}
        alt={movie.Title}
        className={styles.poster}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.Title}</h3>
        <p className={styles.meta}>{movie.Year} • {movie.Type}</p>
        <button
          onClick={() => onAddToFavorites(movie)}
          className={styles.favButton}
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
}