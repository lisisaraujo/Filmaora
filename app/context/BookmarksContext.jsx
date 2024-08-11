import React, { createContext, useState } from 'react';

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
    const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

    const addBookmark = (movie) => {
        setBookmarkedMovies((prevBookmarks) => [
            ...prevBookmarks,
            movie
        ]);
    };

    const removeBookmark = (movieId) => {
        setBookmarkedMovies((prevBookmarks) =>
            prevBookmarks.filter((bookmark) => bookmark.id !== movieId)
        );
    };

    const isBookmarked = (movieId) => {
        return bookmarkedMovies.some((bookmark) => bookmark.id === movieId);
    };

    return (
        <BookmarksContext.Provider value={{ bookmarkedMovies, addBookmark, removeBookmark, isBookmarked }}>
            {children}
        </BookmarksContext.Provider>
    );
};
