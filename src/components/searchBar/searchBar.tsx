import { useState, FormEvent } from "react";
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
        <div className={styles.searchContainer}>
            <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for a movie..."
            className={styles.input}
            />
            <button type="submit" className={styles.button}>
            🔍
            </button>
        </div>
    </form>
    )
}