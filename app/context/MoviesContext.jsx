import React, { createContext, useContext, useState, useEffect } from 'react';
import { TMDB_API_KEY } from "@env";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [movieDetails, setMovieDetails] = useState(null);
    const [cache, setCache] = useState({});
    const [error, setError] = useState(null);

    const fetchMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`);
            const data = await response.json();
            setMovies(data.results || []);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setError(error);
        }
    };

    const fetchSearchResults = async (query) => {
        if (!query) {
            setSearchResults([]);
            return;
        }

        if (cache[query]) {
            setSearchResults(cache[query]);
            return;
        }

        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
            const data = await response.json();
            setSearchResults(data.results || []);
            setCache(prevCache => ({ ...prevCache, [query]: data.results || [] }));
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError(error);
        }
    };

    const fetchMovieDetails = async (id) => {
        if (!id) {
            setMovieDetails("No movie found.");
            return;
        }

        if (cache[id]) {
            setMovieDetails(cache[id]);
            return;
        }

        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`);
            const data = await response.json();
            setMovieDetails(data || null);
            setCache(prevCache => ({ ...prevCache, [id]: data }));
        } catch (error) {
            console.error('Error fetching movie details:', error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <MoviesContext.Provider value={{ movies, searchResults, movieDetails, fetchSearchResults, fetchMovieDetails, error }}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMovies = () => useContext(MoviesContext);
