import React, { useState } from "react";
import { useRouter, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert, StyleSheet } from "react-native";
import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [query, setQuery] = useState(initialQuery || "");

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={query}
                placeholder="Search for a movie"
                placeholderTextColor="#CDCDE0"
                onChangeText={setQuery}
            />
            <TouchableOpacity
                onPress={() => {
                    if (query === "") {
                        return Alert.alert(
                            "Missing Input",
                            "Please input something to search"
                        );
                    }

                    if (pathname.startsWith("/search")) {
                        router.setParams({ query });
                    } else {
                        router.push(`/search/${query}`);
                    }
                }}
                style={styles.searchButton}
            >
                <Image source={icons.search} style={styles.searchIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        height: 48,
        paddingHorizontal: 12,
        backgroundColor: "#1C1C1C",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#333333",
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: "#FFFFFF",
        fontFamily: "Poppins-Regular",
    },
    searchButton: {
        marginLeft: 8,
    },
    searchIcon: {
        width: 18,
        height: 18,
        tintColor: "#FFFFFF",
    },
});

export default SearchInput;
