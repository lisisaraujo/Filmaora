import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, View, StyleSheet } from "react-native";

import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";


const dummyData = [
    {
        id: "1",
        title: "Movie 1",
        thumbnail: images.thumbnail,
        video: images.thumbnail,
        creator: { username: "Director 1", avatar: images.profile },
    },
    {
        id: "2",
        title: "Movie 2",
        thumbnail: images.thumbnail,
        video: images.thumbnail,
        creator: { username: "Director 2", avatar: images.profile },
    },
    // Add more dummy movies as needed
];

const Explore = () => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        // Simulate a network request
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={dummyData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <VideoCard
                        title={item.title}
                        thumbnail={item.thumbnail}
                        video={item.video}
                        creator={item.creator.username}
                        avatar={item.creator.avatar}
                    />
                )}
                ListHeaderComponent={<SearchInput />}
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
        backgroundColor: '#f0f0f0', // Replace with your desired background color
    },
});

export default Explore;
