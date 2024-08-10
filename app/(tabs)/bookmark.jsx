
import React, { useContext } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import MovieCard from '../../components/MovieCard';
import { BookmarksContext } from '../context/BookmarksContext';

const Bookmark = () => {
    const { bookmarks, removeBookmark } = useContext(BookmarksContext);

    return (
        <SafeAreaView>
            <FlatList
                data={bookmarks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MovieCard
                        title={item.title}
                        thumbnail={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
                        onUnfavorite={() => removeBookmark(item.movieId)}
                        isFavorite={true}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Bookmark;
