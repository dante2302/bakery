import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T)
{
    const [state, setState] = useState(() => getStorageValue());

    useEffect(() => {localStorage.setItem(key, JSON.stringify(state))}, [state]);

    function getStorageValue() {
        const storage = localStorage.getItem(key);
        const initial = storage !== null ? JSON.parse(storage) : defaultValue;
        return initial; 
    }

    return [state, setState];
}
