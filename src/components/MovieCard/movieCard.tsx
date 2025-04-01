import { Movie } from "../../types/movie";
import { color, motion, useAnimation } from "framer-motion";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
  onAddToFavorites: (movie: Movie) => void;
}

export default function MovieCard({ movie, onAddToFavorites, favorites }: MovieCardProps) {
  const controls = useAnimation(); // Controlamos la animación manualmente
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const handleClick = async () => {
    if (isFavorite) return;
      await controls.start({ scale: 0.9 });
      onAddToFavorites(movie);
      await controls.start({ scale: 1 });
  };

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
        <motion.button 
          onClick={handleClick}
          animate={controls}
          whileHover={{ scale: 1.05 }}
          className={`${styles.favButton} ${isFavorite ? styles.added : ""}`}
        >
          {isFavorite ? "⭐ Added to Favorites" : "Add to Favorites ⭐"}
        </motion.button>
      </div>
    </div>
  );
}