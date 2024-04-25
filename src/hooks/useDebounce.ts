import { useState, useEffect } from "react";

// value is state that can be changed
export function useDebounce<T>(value: T, delay = 1000) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log("inside useDebounce");
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [value, delay]);

    return debouncedValue;
}
