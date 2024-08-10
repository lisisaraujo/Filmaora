// // src/data/database.js
// import * as SQLite from 'expo-sqlite';

// // Open the database
// const db = SQLite.openDatabase('movies.db');

// // Initialize the database
// export const initDB = () => {
//     db.transaction(tx => {
//         tx.executeSql(
//             'CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY AUTOINCREMENT, movieId INTEGER NOT NULL, title TEXT NOT NULL, posterPath TEXT NOT NULL);'
//         );
//         tx.executeSql(
//             'CREATE TABLE IF NOT EXISTS bookmarks (id INTEGER PRIMARY KEY AUTOINCREMENT, movieId INTEGER, title TEXT, posterPath TEXT);'
//         );
//     });
// };

// // Add a movie to bookmarks
// export const addBookmark = (movieId, title, posterPath) => {
//     db.transaction(tx => {
//         tx.executeSql(
//             'INSERT INTO bookmarks (movieId, title, posterPath) VALUES (?, ?, ?);',
//             [movieId, title, posterPath],
//             (_, resultSet) => console.log('Bookmark added:', resultSet),
//             (_, error) => console.log('Error adding bookmark:', error)
//         );
//     });
// };

// // Get all bookmarks
// export const getBookmarks = (callback) => {
//     db.transaction(tx => {
//         tx.executeSql(
//             'SELECT * FROM bookmarks;',
//             [],
//             (_, { rows }) => callback(rows._array),
//             (_, error) => console.log('Error fetching bookmarks:', error)
//         );
//     });
// };

// // Remove a bookmark
// export const removeBookmark = (movieId) => {
//     db.transaction(tx => {
//         tx.executeSql(
//             'DELETE FROM bookmarks WHERE movieId = ?;',
//             [movieId],
//             (_, resultSet) => console.log('Bookmark removed:', resultSet),
//             (_, error) => console.log('Error removing bookmark:', error)
//         );
//     });
// };
