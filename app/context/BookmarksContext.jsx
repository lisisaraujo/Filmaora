// src/context/BookmarksContext.js
import React, { createContext, useState } from 'react';

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([]);

    const addBookmark = (movieId, title, posterPath) => {
        setBookmarks((prevBookmarks) => [
            ...prevBookmarks,
            { movieId, title, posterPath }
        ]);
    };

    const removeBookmark = (movieId) => {
        setBookmarks((prevBookmarks) =>
            prevBookmarks.filter((bookmark) => bookmark.movieId !== movieId)
        );
    };

    return (
        <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
            {children}
        </BookmarksContext.Provider>
    );
};
