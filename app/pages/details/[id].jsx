import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DetailsPage = () => {
    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text>Details page for movie ID: {id}</Text>
        </View>
    );
};

export default DetailsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
