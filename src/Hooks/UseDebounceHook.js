import { useEffect, useRef } from "react";

//DEBOUNCE FUNCTION
const useDebounce = (func, delay) => {
    const debounceTimeout = useRef(null);
    const latestArgs = useRef();

    useEffect(() => {
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, []);
    return (...args) => {
        latestArgs.current = args;
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            func(...latestArgs.current);
        }, delay);
    };
};

export default useDebounce;