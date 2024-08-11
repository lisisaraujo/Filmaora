import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../../components/MovieCard";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { TMDB_API_KEY } from "@env";

const TMDB_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`;

const Search = () => {
    const { query } = useLocalSearchParams();
    const [movies, setMovies] = React.useState([]);
    const [error, setError] = React.useState(null);

    const fetchMovies = async () => {
        if (!query) return;
        try {
            const response = await fetch(`${TMDB_SEARCH_URL}${query}`);
            const data = await response.json();
            setMovies(data.results || []);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [query]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MovieCard
                        title={item.title}
                        thumbnail={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        video={item.video}
                        creator={item.creator?.username || "Unknown"}
                        avatar={item.creator?.avatar || ""}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4">
                        <Text className="font-pmedium text-gray-100 text-sm">
                            Search Results
                        </Text>
                        <Text className="text-2xl font-psemibold text-white mt-1">
                            {query}
                        </Text>

                        <View className="mt-6 mb-8">
                            <SearchInput initialQuery={query} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos found for this search query"
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Search;