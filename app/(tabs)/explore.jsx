
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images } from "../../constants";
import MovieCard from "../../components/MovieCard";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import { TMDB_API_KEY } from "@env";
import { BookmarksContext } from '../context/BookmarksContext';

const TMDB_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}`;

const Explore = () => {
    const { bookmarks, addBookmark, removeBookmark } = useContext(BookmarksContext);
    const [movies, setMovies] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const fetchMovies = async () => {
        try {
            const response = await fetch(TMDB_API_URL);
            const data = await response.json();
            setMovies(data.results);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchMovies();
        setRefreshing(false);
    };

    return (
        <SafeAreaView className="bg-primary">
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MovieCard
                        key={item.id}
                        title={item.title}
                        thumbnail={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        releaseYear={item.releaseYear}
                        onFavorite={() => addBookmark(item.id, item.title, item.poster_path)}
                        onUnfavorite={() => removeBookmark(item.id)}
                        isFavorite={bookmarks.some(b => b.movieId === item.id)}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                        <View className="flex justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">
                                    Welcome Back
                                </Text>
                                <Text className="text-2xl font-psemibold text-white">
                                    JSMastery
                                </Text>
                            </View>

                            <View className="mt-1.5">
                                <Image
                                    source={images.logoSmall}
                                    className="w-9 h-10"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>

                        <SearchInput />

                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-lg font-pregular text-gray-100 mb-3">
                                Latest Videos
                            </Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Results."
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    );
};

export default Explore;
