import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { icons } from "../constants";
import { BookmarksContext } from "../app/context/BookmarksContext";
import { useRouter } from "expo-router";

const MovieCard = ({ id, title, releaseYear, thumbnail }) => {
    const { addBookmark, removeBookmark, isBookmarked } = useContext(BookmarksContext);
    const router = useRouter();

    const handleToggleBookmark = () => {
        if (isBookmarked(id)) {
            removeBookmark(id);
        } else {
            addBookmark({ id, title, releaseYear, thumbnail });
        }
    };

    const handleClick = () => {
        console.log(id)
        router.push(`/details/${id}`);
    };

    return (
        <TouchableOpacity onPress={handleClick} style={styles.cardContainer}>
            <View style={styles.infoRow}>
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>
                    <Text style={styles.releaseYear} numberOfLines={1}>
                        {releaseYear}
                    </Text>
                </View>

                <TouchableOpacity onPress={handleToggleBookmark}>
                    <Image
                        source={icons.bookmark}
                        style={[
                            styles.bookmarkIcon,
                            { tintColor: isBookmarked(id) ? '#FFA001' : '#CDCDE0' }
                        ]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.thumbnailContainer}>
                <Image
                    source={{ uri: thumbnail }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 56,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    textContainer: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    releaseYear: {
        fontSize: 12,
        color: '#CDCDE0',
    },
    bookmarkIcon: {
        width: 20,
        height: 20,
    },
    thumbnailContainer: {
        width: '100%',
        height: 240,
        borderRadius: 12,
        marginTop: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
});

export default MovieCard;
