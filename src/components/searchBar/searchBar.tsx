import { useState, FormEvent } from "react";
import {motion} from 'framer-motion';
import styles from "./SearchBar.module.css";


interface SearchBarProps {
    onSearch: (query: string) => void;
}
export const SearchBar = ({onSearch}: SearchBarProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(inputValue.trim()){
            onSearch(inputValue);
        }
    }
    
    return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <motion.div initial={{scale: 0.5}} animate={{scale: 1}} transition={{ duration: 0.5 }} className={styles.searchContainer}>
            <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for a movie..."
            className={styles.input}
            autoFocus
            />
            <button type="submit" className={styles.button}>
            🔍
            </button>
        </motion.div>
    </form>
    )
}