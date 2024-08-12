import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useMovies } from '../context/MoviesContext';
import MovieCard from "../../components/MovieCard";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailsPage = () => {
    const { id } = useLocalSearchParams();
    const { fetchMovieDetails, movieDetails, error } = useMovies();
    const router = useRouter();

    useEffect(() => {
        fetchMovieDetails(id);
    }, [id]);

    if (error) {
        return (



            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
        );
    }

    if (!movieDetails) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
        );
    }

    return (<SafeAreaView className="bg-primary h-full">
        <View style={styles.container}>
            <MovieCard
                id={movieDetails.id}
                title={movieDetails.title}
                releaseYear={new Date(movieDetails.release_date).getFullYear().toString()}
                thumbnail={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            />
            <View style={styles.detailsContainer}>
                <Text style={styles.overview}>{movieDetails.overview}</Text>
                <Text style={styles.detailText}>Rating: {movieDetails.vote_average}</Text>
                <Text style={styles.detailText}>Release Date: {movieDetails.release_date}</Text>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    );
};

export default DetailsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#1C1C1C',
    },
    detailsContainer: {
        marginTop: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
        backgroundColor: '#2C2C2C',
        borderRadius: 12,
        padding: 16,
        width: '90%',
    },
    overview: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#CDCDE0',
        marginBottom: 4,
    },
    errorText: {
        color: 'red',
    },
    backButton: {
        marginTop: 20,
        backgroundColor: '#444444',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
