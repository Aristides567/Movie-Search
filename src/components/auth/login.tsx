import { useState } from "react";
import google from '../../assets/google.svg'
import styles from './login.module.css';
import {motion} from 'framer-motion';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={styles.container}>
            <motion.div className={styles.loginCard}  initial={{x: -1000}} animate={{x: 0}} transition={{duration: 0.5}}>
                <div className={styles.header}>
                    <h2>Bienvenido</h2>
                    <p>Inicia sesión para continuar</p>
                </div>
                
                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Usuario</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ingresa tu usuario"
                            required
                            autoFocus
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>
                    
                    <button className={styles.loginButton}>Iniciar Sesión</button>
                    
                    <div className={styles.divider}>
                        <span>o continúa con</span>
                    </div>
                    
                    <button type="button" className={styles.googleButton}>
                        <img src={google} alt="Google logo" />
                        Google
                    </button>
                    
                    <div className={styles.footer}>
                        ¿No tienes una cuenta? <a href="/register">Regístrate</a>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}