import { useState } from "react";
import google from '../../assets/google.svg'
import styles from './login.module.css';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();
        setIsLoading(true);

        const Username = username.trim();
        const Password = password.trim();

        try{
            const response = await fetch('http://localhost:8001/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: Username, password: Password})
            });

            const data = await response.json();

            if(response.ok){
                alert('Login Successful');
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/home')
            }
            else{
                setMessage(`Login failed: , ${data}`)
                return
            }


        } catch (err){
            setMessage(`Error al conectar al servidor: ${err}`);
            return
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <motion.div className={styles.loginCard}  initial={{x: -1000}} animate={{x: 0}} transition={{duration: 0.5}}>
                <div className={styles.header}>
                    <h2>Bienvenido</h2>
                    <p>Inicia sesión para continuar</p>
                </div>
                
                <form className={styles.form} onSubmit={handleLogin}>
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
                    
                    <button className={styles.loginButton} type="submit">Iniciar Sesión</button>
                    
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

                    {message && <p style={{textAlign: 'center', color: 'red'}}>{message}</p>}
                </form>
            </motion.div>
        </div>
    )
}