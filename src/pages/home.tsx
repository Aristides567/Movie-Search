import React from "react";
import { useState, useEffect, useRef } from "react";
import { SearchBar } from "../components/searchBar/searchBar"
import { UseMovies } from "../hooks/useMovies";
import { Movie } from "../types/movie";
import { UselocalStorage } from "../hooks/useLocalStorage";
import Favorites from "../components/favorites/favorites";
import SkeletonLoader from "../components/skeletonLoader/skeletonLoader";
import MovieCard from "../components/MovieCard/movieCard";
import {motion} from 'framer-motion';
import styles from './Home.module.css';
import Loged_user from '../assets/user_loged.svg';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const API_KEY = import.meta.env.VITE_API_KEY

    const [query, setQuery] = useState("");
    const {movies, loading, error} = UseMovies(query, API_KEY);
    const [favorites, setFavorites] = UselocalStorage<Movie[]>('favorites', []);
    const [isLogged, setIsLogged] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setIsLogged(true);
        setUsername(JSON.parse(storedUser));
      }
    },[])

    const handleLogout = async () =>{
      localStorage.removeItem('user');
      setIsLogged(false);
      navigate('/login')
    }

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          if (logoRef.current && !logoRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
          }
        }
      };

      if (isModalOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isModalOpen]);

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
        <div className={styles.app}>
          <div className={styles.container}>
              <motion.div 
                ref={logoRef}
                className={styles.logo_container}
                initial={{ opacity: 0, x: 1000 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
                onClick={toggleModal}
                aria-haspopup="true"
                aria-expanded={isModalOpen}
              >
                <img src={Loged_user} alt="User menu" />
            </motion.div>

          {isModalOpen && (
          <div 
            ref={modalRef}
            className={`${styles.loged_modal} ${isModalOpen ? styles.active : ''}`}
            role="menu"
          >
            {isLogged ? (
              <>
                <p style={{ textAlign: "center" }} role="menuitem">
                  Bienvenido, {typeof username === 'string' ? username : username?.name || 'Invitado'}
                </p>
                <p role="menuitem" className={styles.menuItem}>
                  Favoritos
                </p>
                <button 
                  type="button" 
                  role="menuitem" 
                  className={styles.menuButton}
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <div className={styles.login_section}>
                <h3>Iniciar sesión</h3>
                <p>Para guardar tus favoritos</p>
                <Link to='/login'>                
                    <button 
                    className={styles.primaryButton}
                    onClick={() => {}}
                    >
                    Ingresar
                    </button>
                </Link>

                <button 
                  className={styles.secondaryButton}
                  onClick={toggleModal}
                >
                  Más tarde
                </button>
              </div>
            )}
          </div>
        )}
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
    )
}