import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, StyleSheet } from "react-native";
import { images } from "../../constants";
import MovieCard from "../../components/MovieCard";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import { useMovies } from '../context/MoviesContext';

const Explore = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { movies, error } = useMovies();

    const onRefresh = async () => {
        setRefreshing(true);
        await movies();
        setRefreshing(false);
    };

    if (error) {
        return <Text style={styles.errorText}>Error loading movies: {error.message}</Text>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MovieCard
                        id={item.id}
                        title={item.title}
                        releaseYear={item.release_date.split('-')[0]}
                        thumbnail={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    />
                )}
                ListHeaderComponent={() => (
                    <View style={styles.headerContainer}>
                        <View style={styles.headerRow}>
                            <Text style={styles.headerTitle}>Filmaora</Text>
                            <Image
                                source={images.logoSmall}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                        <SearchInput />
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Movies Found"
                        subtitle="No movies available at the moment"
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#161622',
    },
    headerContainer: {
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    logo: {
        width: 36,
        height: 40,
    },
    errorText: {
        color: '#FF0000',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Explore;
