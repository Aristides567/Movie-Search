import { useState, useEffect } from "react"

export function UselocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const storageValue = localStorage.getItem(key);
        return storageValue ? JSON.parse(storageValue) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const
}

