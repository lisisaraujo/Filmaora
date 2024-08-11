import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import MovieCard from "../../components/MovieCard";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { icons } from "../../constants";
import { useMovies } from '../context/MoviesContext';

const Search = () => {
    const { query } = useLocalSearchParams();
    const { movies, searchResults, fetchSearchResults, error } = useMovies();
    const navigation = useNavigation();

    useEffect(() => {
        if (query) {
            fetchSearchResults(query);
        }
    }, [query]);

    const dataToDisplay = query ? searchResults : movies;

    return (
        <SafeAreaView style={styles.safeArea}>
            {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
            <FlatList
                data={dataToDisplay}
                keyExtractor={(item) => item.id.toString()}
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
                        <View style={styles.topRow}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                                <Image source={icons.goBack} style={styles.goBackIcon} />
                            </TouchableOpacity>
                            <SearchInput initialQuery={query} style={styles.searchInput} />
                        </View>
                        <View style={styles.searchInfo}>
                            <Text style={styles.searchResultsText}>
                                {query ? `Search Results for: ${query}` : "Popular Movies"}
                            </Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Movies Found"
                        subtitle="No movies available at the moment"
                    />
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#161622',
        flex: 1,
    },
    headerContainer: {
        marginVertical: 12,
        paddingHorizontal: 16,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    goBackButton: {
        marginRight: 8,
    },
    goBackIcon: {
        width: 16,
        height: 16,
        tintColor: "#FFF",
    },
    searchInput: {
        flex: 1,
    },
    searchInfo: {
        marginTop: 16,
        marginBottom: 24,
    },
    searchResultsText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFF",
    },
    errorText: {
        color: 'red',
        padding: 10,
        textAlign: 'center',
    },
});

export default Search;
