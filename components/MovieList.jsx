import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useMovies } from './context/MoviesContext';
import MovieCard from './components/MovieCard';

const MoviesList = () => {
    const { movies, error } = useMovies();

    if (error) {
        return <Text>Error loading movies: {error.message}</Text>;
    }

    return (
        <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard movie={item} />}
        />
    );
};

export default MoviesList;
