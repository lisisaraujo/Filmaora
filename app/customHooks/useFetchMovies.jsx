import { useState, useEffect } from 'react';

const useFetchMovies = (url) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setMovies(data.results || []);
            } catch (err) {
                setError(err);
            }
        };

        fetchMovies();
    }, [url]);

    return { movies, error };
};

export default useFetchMovies;
