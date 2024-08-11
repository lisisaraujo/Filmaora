import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, View } from "react-native";
import MovieCard from "../../components/MovieCard";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import { BookmarksContext } from "../context/BookmarksContext";

const Bookmark = () => {
    const { bookmarkedMovies } = useContext(BookmarksContext);

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={bookmarkedMovies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MovieCard
                        id={item.id}
                        title={item.title}
                        releaseYear={item.releaseYear}
                        thumbnail={item.thumbnail}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                        <View className="flex justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="text-2xl font-psemibold text-white">
                                    Your Bookmarks
                                </Text>
                            </View>
                        </View>

                        <SearchInput />
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Movies Found"
                        subtitle="Add your first bookmark"
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Bookmark;
